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

export type CommandResponse = {
    fn: Function,
    chatId: string
}
type CHAT_STATE={
    wrapper: Function | null;
    status: CHAT_STATUS;
    state:Array<string>;
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
        if ((response as CommandResponse).chatId === undefined)
            return true;
        const res = response as CommandResponse;
       this.chatState.set(res.chatId,{wrapper: res.fn,status:CHAT_STATUS.KEYBOARD_CHAIN,state:[]});
    }
    private handelChain(text: string, chatId: string) {
        switch(text){
            case "отмена":
                this.closeKeyboard(chatId, "ОТМЕНИТЬ");
                this.chatState.delete(chatId)
                break;
                case "далее":
                    const obj=this.chatState.get(chatId)
                    this.chatState.delete(chatId);
                    obj.wrapper(obj.state).execute();
                    break;
                    default:
                        let state=this.chatState.get(chatId).state;
                           const index=state.indexOf(text);
                                if(index===-1)
                                {
                                    state.push(text);
                                    this.sendMessage(chatId,`пользователь ${text} добавлен \u2705`)
                                }
                                    else
                                     {   state.splice(index,1);    
                                        this.sendMessage(chatId,`пользователь ${text} удален \u274C`)
                                    }
                    
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