import {Command} from './Command'
import {userResurce,UserResurce} from './../../resurce/user.resurce'
import {SocketCustom} from './../../webChat/types'
import Room from '../../models/Room';

export class SendCommand implements Command{
    private msg:string;
    private chatId:string;
    private executor:Function;
    private resurce:UserResurce;
    private date:string;
    constructor(args:Array<string>,chatId:string,date:string,executor:Function,resurce:UserResurce){
        this.msg=args.join(" ");
        this.chatId=chatId;
        this.executor=executor;
        this.resurce=resurce;
        this.date=date;
    }

 async execute(){
      
       const data:{login:string,room:string}= await this.resurce.getUserByChatId(this.chatId);
       const fakeSocket:SocketCustom={socket:{data:"FAKE SOCKET"},roomId:data.room,id:Date.now().toString()};
        const reqData={roomID:data.room,loginUser:data.login,msg:this.msg,date:this.date};
        this.executor(fakeSocket,reqData);
}

} 