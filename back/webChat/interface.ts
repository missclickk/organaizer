import {reqData,resData,SocketCustom} from './types'


export interface IStorage{
    getItemByName(key:any,value?:string):any;
    setItemByName(key:any,value:any):any;
    deleteItemByName(key:any):boolean;
    
}


export interface IStorageCrud extends IStorage{
    updateItemByName(key:string,subKey:Array<string>,value:any);
}


export interface MsgHandler{
    handelMsg(soc:SocketCustom|object,data:reqData):Promise<resData>;
}