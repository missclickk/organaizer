import {chatResurce,ChatResurce} from '../../resurce/chatBot.resurce'
import {IStorageCrud} from './../interface'
type IRoom={
    clients:Array<Object>;
    chat?:Array<Object>;
    chatBots?:Array<string>;
}



export class MsgStorage implements IStorageCrud {
    cache:Map<string,IRoom>=new Map();
    resurce:ChatResurce;
    constructor(resurce:ChatResurce){
        this.resurce=resurce;
    }
 
    async setItemByName(key:string,value:Object):Promise<any>{      
        let room:IRoom;
   
         room={clients:[value]};
        this.cache.set(key,room);
            return 1;
    }

   async updateItemByName(key:string,subKey:Array<string>,value:any){
            if(!this.cache.has(key))
                await this.setItemByName(key,value);
            else{

                    const room:IRoom=this.cache.get(key);
                    room[subKey[0]]?room[subKey[0]].push(value): room[subKey[0]]=[value];                    
                   this.cache.set(key,room);
                    
            }    
            
    };


    getItemByName(key:string,value:any):Array<Object>| Array<string>|boolean{
        let art=this.cache.has(key.toString());
        let buf:IRoom;
        if(!this.cache.has(key.toString()))
        return false;
        buf=this.cache.get(key.toString());
        if(buf[value]){ 
        return buf[value];}
        return false;
    };


    deleteItemByName(key:string):boolean{
          return  this.cache.delete(key);
    };
}






export const msgStorage:MsgStorage=new MsgStorage(chatResurce);