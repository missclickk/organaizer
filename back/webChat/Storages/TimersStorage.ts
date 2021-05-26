import {IStorage} from './../interface' 


export class TimersStorage implements IStorage{
    timerList:Map<string,NodeJS.Timeout>=new Map();
    
     constructor(){}

    deleteItemByName(key:string){
    
        clearTimeout( this.getItemByName(key));
        return this.timerList.delete(key);
    }
    setItemByName(key:string,value:NodeJS.Timeout){                     
            this.timerList.set(key,value);
    }
    getItemByName(key){
        return this.timerList.get(key);
    }

}

export const timersStorage =new TimersStorage();