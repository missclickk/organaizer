import * as  TelegramBot from 'node-telegram-bot-api'
import { Bot } from './bot'
import { IListener } from "./../classes/IServer"
import { CommandFactory } from "./Commands/CommandFactory"
import { Command } from "./Commands/Command"
import { CommandExecutor } from './CommandExecutor'
enum CHAT_STATUS {
    MESSAGE = 0,//reg //send //create_todo //create_task
    MESSAGE_CHAIN,
    KEYBOARD_CHAIN,

}
const PERIOD_ARRAY:Array<string[]>=[["никогда"],["каждый день"],["каждую неделю"],["каждый месяц"],["каждый год"]];

export type CommandResponse = {
    fn: Function,
    chatId: string,
    commandType:string
}
type CHAT_STATE={
    wrapper: Function | null;
    state:Array<string>;
    commandType:string

}

const TOKEN: string = "1751041214:AAGNTL9PX2k0TWCUoj2pdTiS5Xr_5oeLoik";

export class TBot implements IListener, Bot {
    private chatState: Map<string, CHAT_STATE> = new Map();
    private executor: CommandExecutor;
    private token: string;
    private bot: any;

    constructor(token: string, tBot: any, executor: CommandExecutor) {
        this.token = token;
        this.createBot(tBot);
        this.executor = executor;

    }
    private createBot(bot: any): void {
        this.bot = new bot(this.token, {
            polling: {
                interval: 300,
                autoStart: true,
                params: {
                    timeout: 10
                }
            }
        })
    }
    sendKeyboard(chatId: string, msg: string, keyboard: Array<Array<string>>) {
        this.bot.sendMessage(chatId, msg, {
            reply_markup: {
                keyboard: keyboard
            }
        })
    }
    closeKeyboard(chatId: string, msg: string): void {
        this.bot.sendMessage(chatId, msg, {
            reply_markup: {
               remove_keyboard: true
            }
        })
    }
    sendMessage(chatId: string, msg: string): void {
        this.bot.sendMessage(chatId, msg);
    }
    private parseText(text: string): { type: string, args: Array<string> } {
        const commandAndArgs: Array<string> = text.split(" ");
        const type: string = commandAndArgs[0].substring(0, 1) === "/" ? commandAndArgs.shift() : "notACommand";
        const args: Array<string> = commandAndArgs.filter(e => e !== " ");
        return { type, args };
    }

    handelMessage(response: boolean | CommandResponse) {
        if ((response as CommandResponse).commandType === undefined)
            return true;
        const res = response as CommandResponse;
       this.chatState.set(res.chatId,{wrapper: res.fn,state:[],commandType:res.commandType});
    }
   
    private async handelChainMsg(text:string,chatId:string){
        let chatState=this.chatState.get(chatId)
        switch(chatState.commandType){
            case "users":
                const index=chatState.state.indexOf(text);
                if(index===-1)
                {
                    chatState.state.push(text);
                    this.sendMessage(chatId,`пользователь ${text} добавлен \u2705`)
                }
                    else
                     {   
                        chatState.state.splice(index,1);    
                        this.sendMessage(chatId,`пользователь ${text} удален \u274C`)
                    }
                    this.chatState.set(chatId,chatState);
                return;// не доходит до конца функции а завершается здесь 
            case"disciprion":
            chatState.commandType="date";
            this.sendMessage(chatId, "ВВЕДИТЕ ДАТУ В ФОРМАТЕ гггг-мм-дд");
            break;
            case "date":
            chatState.commandType="time";
            this.sendMessage(chatId, "ВВЕДИТЕ ВРЕМЯ В ФОРМАТЕ чч:мм");
                break;
             case "time":
                chatState.commandType="period";
                this.sendKeyboard(chatId, "ВЫБЕРЕТЕ ПРИРОД ПОВТАРЕНИЯ",PERIOD_ARRAY);
                 break;
             case "period":
                chatState.commandType="users";
                await this.executor.getCommandResult( "/send_users", [], chatId, "date")
                 break;       
            default: break;
        }
        chatState.state.push(text);
        chatState.wrapper.bind(null,text);
        this.chatState.set(chatId,chatState);
    }

    private handelChain(text: string, chatId: string) {
        switch(text){
            case "отмена":
                this.closeKeyboard(chatId, "ОТМЕНИТЬ");
                this.chatState.delete(chatId)
                break;
                case "далее":
                    console.log(this.chatState.get(chatId));
                    this.closeKeyboard(chatId, "THE END");
                    const obj=this.chatState.get(chatId);
                    this.chatState.delete(chatId);
                    obj.wrapper(obj.state).execute();
                    break;
                    default:
                        this.handelChainMsg(text,chatId);    
                    break;
        }
    
    }

    start(): void {
        this.bot.on('message', async msg => {
            try {
                const { text, chat, date } = msg; 
                if(!this.chatState.has(chat.id)){     
                const { type, args } = this.parseText(text as string);
                this.handelMessage(await this.executor.getCommandResult(type, args, chat.id, date));
                }
                else
                        this.handelChain(msg.text, chat.id);

            }
            catch (e) {
                this.sendMessage(msg.chat.id, "ПАЦАНЫ, ЦЕНИТЕ МАТЬ!");
                console.log((e as Error).stack);
                console.log(e.message);
            }
        })


    };
}

export const tbot = new TBot(TOKEN, TelegramBot, new CommandExecutor(new CommandFactory()));