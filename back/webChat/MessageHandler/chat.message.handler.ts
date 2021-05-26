import { reqData, SocketCustom, resData } from './../types'
import {IStorageCrud, MsgHandler } from './../interface'
import {ObservableWrapper} from './../../wrappers/ObserverWrapper'
import { msgStorage } from '../Storages/MsgStorage'
import {tbot}from './../../chatbots/t_bot'
import {chatResurce,ChatResurce} from './../../resurce/chatbot.resurce'





export class ChatMsgHanlder extends ObservableWrapper implements MsgHandler {
     msgStorage: IStorageCrud;
    private resurce:ChatResurce;
    constructor(msgStorage: IStorageCrud,res:ChatResurce) {
        super();
        this.msgStorage = msgStorage;
        this.resurce=res;
    }
    private async sendMessageInMessanger(roomID:string,loginUser:string,msg:string){
        const bots:Array<string>=await this.resurce.getClients(roomID);
            bots.forEach(e=>tbot.sendMessage(e,loginUser+": "+msg));
        }


  async  handelMsg(socket: SocketCustom, data: reqData): Promise<resData> {
        const { roomID, date, loginUser, msg } = data;
        await this.sendMessageInMessanger(roomID,loginUser,msg);
      
        const responseData = { msg, date, loginUser };
        this.msgStorage.updateItemByName(roomID, ["chat"], responseData);
        const obj= this.msgStorage.getItemByName(roomID, "clients");
        if((obj as Array<any>).filter!==undefined){
        const clients:Array<any> = this.msgStorage.getItemByName(roomID, "clients").filter(e => e!= socket.socket);
        this.notifyObservers([socket.socket,{ type: "chat_msg", clients,message: [responseData] },"all"]);       
        return { type: "chat_msg", clients,message: [responseData] };
        }
        else{
            this.resurce.setChat(roomID,[responseData]);    
        }
    
}

}

export const chatMsg: ChatMsgHanlder = new ChatMsgHanlder(msgStorage,chatResurce);