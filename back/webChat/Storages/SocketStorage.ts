import { SocketCustom } from '../types'
import {IStorage} from './../interface'
 
export class SocketStorage implements IStorage{
    private store:Map<any,SocketCustom>=new Map();

    constructor(){}
    setItemByName(key:any,value:any){
            this.store.set(key,value);
            return this.store.get(key);
    }

    deleteItemByName(key:any):boolean{
        return this.store.delete(key);
    };

    getItemByName(key:any):SocketCustom|boolean{
        if(this.store.has(key))
        return this.store.get(key);
        return false;
    }
}