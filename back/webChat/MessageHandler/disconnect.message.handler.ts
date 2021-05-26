import { SocketCustom } from './../types'
import { TimersStorage, timersStorage } from './../Storages/TimersStorage'
import { MsgStorage, msgStorage } from './../Storages/MsgStorage'
import { ChatResurce,chatResurce} from './../../resurce/chatbot.resurce'
/* 
    -получаем элементы map по socekt.roomID
    - в массиве clients удаляем элемент равный socket.socket===clients[i];
    -проверяем длину  clients, если она равна 0, то создаем таймер.
    -когда таймер сробатывает, происходит запись в бд, удаление таймера, удаление записи в msgStorage;   
  
  */

export class DisconnectHanlder {
  private timerStore: TimersStorage;
  private msgStore: MsgStorage;
  private resurce:ChatResurce;
  constructor(timer: TimersStorage, msg: MsgStorage,resurce:ChatResurce) {
    this.msgStore = msg;
    this.timerStore = timer;
    this.resurce=resurce;
  }
  private async deleteCacheEnty(socket:SocketCustom){
    
    const obj=this.msgStore.getItemByName(socket.roomId,"chat");
    if((obj as Array<Object>).concat!==undefined &&(obj as Array<Object>).length>0) 
      this.resurce.setChat(socket.roomId, obj as Array<Object>);
        this.msgStore.deleteItemByName(socket.roomId);
        this.timerStore.deleteItemByName(socket.roomId);
      
  }

  private setTimer(socket:SocketCustom){
    this.timerStore.setItemByName(socket.roomId,setTimeout(this.deleteCacheEnty.bind(this,socket),3000));
  }

   handelMsg(socket: SocketCustom) {
    const clients = this.msgStore.getItemByName(socket.roomId, "clients");
    let obj = clients as Array<Object>
    if (obj.indexOf === undefined || obj.splice === undefined)
      throw new Error("this clients or room not exists");
    obj.splice(obj.indexOf(socket.socket), 1);
    console.log(obj.length);
    if(obj.length===0)
      this.setTimer(socket);
    else
      this.msgStore.updateItemByName(socket.roomId,["clients"],obj);
  }
  
}


export const disconnectHanlder:DisconnectHanlder=new DisconnectHanlder( timersStorage,msgStorage,chatResurce); 