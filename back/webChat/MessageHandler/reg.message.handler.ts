import {IStorageCrud,IStorage,MsgHandler} from './../interface'
import {SocketCustom,reqData,resData} from './../types'
import {ChatResurce,chatResurce} from './../../resurce/chatbot.resurce'
import {timersStorage} from './../Storages/TimersStorage'
import {msgStorage} from '../Storages/MsgStorage'
import {ObservableWrapper} from './../../wrappers/ObserverWrapper'

export class RegMsgHanlder extends ObservableWrapper implements MsgHandler {
    private resurce: ChatResurce;
    private msgStorage: IStorageCrud;
    private timersStorage: IStorage;

    constructor(msgStorage: IStorageCrud, timersStorage: IStorage, resurce: ChatResurce) {
        super();
        this.msgStorage = msgStorage;
        this.timersStorage = timersStorage;
        this.resurce = resurce;
    }
    
    private initUser(socket:SocketCustom) {
        this.timersStorage.deleteItemByName(socket.roomId);
        this.msgStorage.updateItemByName(socket.roomId,["clients"], socket.socket);
    }
    
    async handelMsg(socket:SocketCustom,msg:reqData): Promise<resData> {
        const { roomID } = msg;
        this.initUser(socket);
        const cacheChat = this.msgStorage.getItemByName( roomID,  "chat");
        const chat =await  this.resurce.getChat(roomID);
        const text:Array<object> = cacheChat && chat ? cacheChat.concat(chat) : cacheChat || chat;
        this.notifyObservers([socket.socket,text ? { type: 'chat_msg', message:text }: {type:"chat_msg",message:[]},"sender"]);
        return text ? { type: 'chat_msg', message:text }: {type:"chat_msg",message:[]};


    }
}

export const regMsg: RegMsgHanlder = new RegMsgHanlder(msgStorage,  timersStorage, chatResurce);