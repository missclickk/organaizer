import { cachedDataVersionTag } from 'v8';
import { Storage } from '../classes/Storage'
import * as Room from '../models/Room'
import * as User from '../models/User'

export class ChatResurce {
    private model;
    private roomModel: typeof Room;
    private Storage: typeof Storage;
    constructor(model, roomModel: typeof Room, storage: typeof Storage) {
        this.model = model;
        this.roomModel = roomModel;
        this.Storage = Storage;
    }
    async getClients(roomID: string): Promise<{chatId:string,login:string}[]> {
        const store = await this.Storage.getItemWithConditionally(this.model, ["room", "chatId"], [roomID, { $exists: true }], ["chatId", "login"]);
        return store.map(e => ({login:e.login,chatId:e.chatId}));
    }

    async getChat(roomID: string): Promise<Array<any>> {
        const { chat } = await this.Storage.getItemByID(this.roomModel, roomID, ['chat']);
        return chat;
    }
    async setChat(roomID: string, msg: Array<Object>): Promise<boolean> {
        try {
            await this.Storage.pushItem(this.roomModel, { "_id": roomID }, "chat", msg);
            return true;
        }
        catch (e) {
            return false;
        }
        /*
         if (cache[roomID].msg)
            await pushItem(Room, { "_id": roomID }, "chat", cache[roomID].msg);
        */
    }
        
}

export const chatResurce = new ChatResurce(User, Room, Storage);