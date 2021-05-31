import * as Room from '../models/Room';
import * as User from '../models/User';
import {Storage}  from '../classes/Storage';


export class UserResurce {
    model;
    roomModel;
    Storage;
    constructor(model, roomModel,storage) {
        this.model = model;
        this.roomModel = roomModel;
        this.Storage=storage;
    }
    async getList(roomId:string):Promise<Array<{_id:string,login:string}>> {
        const usersIds = await  this.Storage.getItemWithConditionally(this.roomModel, ["_id"], [roomId], ['users']);
        const ids = usersIds[0].users;

        return await   this.Storage.getIncludesItems(User, "_id", ids, ['login'])
    }

    async getListByChatId(chatId:string):Promise<Array<{_id:string,login:string}>>{
        const {room}= await this.getUserByChatId(chatId);
            return await  this.getList(room);
    }

    async getUserByChatId(chatId:string):Promise<{login:string,room:string}>{
        
       const data=await this.Storage.getItemWithConditionally(this.model,["chatId"],[chatId],['login','room']);
        
        return {login:data[0].login,room:data[0].room};
    }

    async getUser(email:string):Promise<{_id:string,login:string,password:string,room:string}> {
       try{
           console.log(this.model,User);
        return await  this.Storage.getItemWithConditionally(this.model, ['email'], [email], ['password', 'login', 'room']);
    }
    catch(e){
        console.log("user.resurce 23 "+e.message);
    }
}

    async emailIsExist(email:string):Promise<boolean>{
        const data=await this.Storage.getItemWithConditionally(this.model,["email"],[email])
        return  data.length===0?false:true;
    }

/// получаем пользователей по chat IF 
    async createUser(email:string, login:string, password:string, room:string|undefined):Promise<{login:string,room:string}>{
        const user =await new User({ email, login, password });
         await user.save();
         if (room === undefined) {
             console.log(123);
             const nRoom = new this.roomModel({ users: user._id })
             await nRoom.save();
             await   this.Storage.setItem(User, { _id: user._id }, 'room', nRoom._id)
             room = nRoom._id;
         }
         else {
             await  this.Storage.setItem(User, { _id: user._id }, 'room', room);
             await   this.Storage.pushItem(Room, { _id: room }, 'users', user._id);
         }
         return { login, room };
     }


    async addChatId(email:string,chat:string):Promise<boolean>{
        console.log("here we go");
        //await   this.Storage.setItem(User, { _id: user._id }, 'room', nRoom._id)
            return  await this.Storage.setItem(this.model, { email},"chatId",chat)?true:false;
    } 
}


export const  userResurce=new UserResurce(User,Room,Storage);