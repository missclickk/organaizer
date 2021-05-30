import { SocketCustom,response } from './../types'
import {ObservableWrapper,Observer} from './../../wrappers/ObserverWrapper'
import { SocketStorage } from './../Storages/SocketStorage'
import { chatMsg,ChatMsgHanlder } from './chat.message.handler'
import { regMsg,RegMsgHanlder } from './reg.message.handler'
import { DisconnectHanlder, disconnectHanlder } from './disconnect.message.handler'


export class MessageDistributor  extends ObservableWrapper implements Observer{
    private regHandel: RegMsgHanlder;
    private chatHandel: ChatMsgHanlder;
    private socketStorage: SocketStorage;
    private disconnectHanlder: DisconnectHanlder;

    constructor(reg: RegMsgHanlder, chat:ChatMsgHanlder, disconnectHanlder: DisconnectHanlder, socketStorage: SocketStorage) {
        super();
        this.regHandel = reg;
        this.chatHandel = chat;
        this.socketStorage = socketStorage;
        this.disconnectHanlder = disconnectHanlder;
        this.chatHandel.registrObserver(this);
        this.regHandel.registrObserver(this);
    }

    private getSocket(socket: any, roomID?): SocketCustom {
        let obj = this.socketStorage.getItemByName(socket);
        if ((obj as SocketCustom).id !== undefined)
            return obj as SocketCustom;
        else {
            let test: SocketCustom = { socket, id: Date.now().toString(), roomId: roomID }
            this.socketStorage.setItemByName(socket, test);
            return this.getSocket(socket);
        }
    }
    private deleteSocket(socket: any) {
        this.socketStorage.deleteItemByName(socket);
    }
    async handelIncomingMsg(socket: any, message?: string)/*: Promise<response>*/ {
        const { msg, roomID, type, date, loginUser } = JSON.parse(message);
        try {
            const cSocket: SocketCustom = this.getSocket(socket, roomID);
            switch (type) {
                case 'reg':
                    let resReg = await this.regHandel.handelMsg(cSocket, { roomID })
              
                  //  return { data: resReg, mode: "sender" };
                  break;
                case 'msg':
                    let res = await this.chatHandel.handelMsg(cSocket, { msg, roomID, date, loginUser });
                    
                  //  return { data: res, mode: "all" };
                  break;
                default:
                    const sockt: SocketCustom = this.getSocket(socket);
                    this.disconnectHanlder.handelMsg(sockt);
                    this.deleteSocket(sockt);
                    break;
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    update(args:Array<any>){
       switch(args[2]){
        case "sender":
        this.notifyObservers([args[0],{ data: args[1], mode: "sender" }]);
        break;
        case "all":
        this.notifyObservers([args[0],{ data:args[1], mode: "all" }]);
      
        break;
        default:
        break;
    }
}


}



export const messageDistributor = new MessageDistributor(regMsg, chatMsg, disconnectHanlder, new SocketStorage())