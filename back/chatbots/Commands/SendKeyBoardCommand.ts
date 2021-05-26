import {Command} from './Command'
import {TBot,tbot} from '../t_bot'
import {UserResurce} from './../../resurce/user.resurce'
enum KEYBOARD_TYPE{
    USERS=0
}




export  class SendKeyBoardCommand implements Command{
    private chatId;
    private args:Array<string>;
    private resurce:UserResurce;
    private wrapper:Function;
    constructor(args:Array<string>,chatId:string,resurce:UserResurce,wrapper:Function){
        this.chatId=chatId;;
        this.args=args;
        this.resurce=resurce;
        this.wrapper=wrapper;
    }

        async execute(){
        let users: Array<{_id:string,login:string}>= await this.resurce.getListByChatId(this.chatId);
        const keyboard = users.map(e => [e.login]);
        keyboard.push(["далее"]);
        keyboard.push(["отмена"]);
        if(KEYBOARD_TYPE.USERS===0)
        tbot.sendKeyboard(this.chatId,"ВЫберете пользователей котоым будет виден этот список",keyboard);
        const {room}=await this.resurce.getUserByChatId(this.chatId);
        return this.wrapper.bind(null,this.args.join(" "),room,users.map(e=>e.login));
    }


}

