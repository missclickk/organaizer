import { Command } from './Command'
import { TBot, tbot } from '../t_bot'
import { UserResurce } from './../../resurce/user.resurce'
export enum KEYBOARD_TYPE {
    ERROR = 1,
    DEFAULT,
    USERS,
    ERROR_OVERFLOW
}




export class SendKeyBoardCommand implements Command {
    private chatId;
    private args: Array<string>;
    private resurce: UserResurce;
    private wrapper: Function;
    private keyBoardType: number;
    constructor(type: number, args: Array<string>, chatId: string, resurce: UserResurce, wrapper: Function) {
        this.chatId = chatId;;
        this.args = args;
        this.resurce = resurce;
        this.wrapper = wrapper;
        this.keyBoardType = type;
    }
    private async createUserKeyBoard(): Promise<Array<string[]>> {
        let users: Array<{ _id: string, login: string }> = await this.resurce.getListByChatId(this.chatId);
        const keyboard = users.map(e => [e.login]);
        const { room } = await this.resurce.getUserByChatId(this.chatId);
       this.wrapper=this.wrapper.bind(null,room,this.args.join(" ") , users.map(e => e.login));
        return keyboard;
    }
    async execute() {
        let keyboard: Array<string[]> = [];
        let disciprion: string;
        let commandType:string;
        switch (this.keyBoardType) {
            case KEYBOARD_TYPE.USERS:
                keyboard = await this.createUserKeyBoard();
                disciprion = "Выберете пользователей котоым будет виден этот список";
                commandType="users";
                keyboard.push(["далее"]);
                break;
            case KEYBOARD_TYPE.DEFAULT:
                disciprion="напишите описание события";
                commandType="disciprion";    
                let users: Array<{ _id: string, login: string }> = await this.resurce.getListByChatId(this.chatId);
                const { room } = await this.resurce.getUserByChatId(this.chatId);
                this.wrapper=this.wrapper.bind(null,room,this.args.join(" ") , users.map(e => e.login));
            default:
                break;
        }

    
        keyboard.push(["отмена"]);

        tbot.sendKeyboard(this.chatId, disciprion, keyboard);

        return {wrapper:this.wrapper,commandType};
    }


}

