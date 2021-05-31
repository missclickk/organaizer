import * as Task from './../models/Task';
import * as Room  from './../models/Room';
import {Storage} from './../classes/Storage'

export type Task={
    title:string;
    discription:string;
    date:string;
    time:string;
    period:string;
    users:any;
}

export class TaskResurce {
    private model;
    private roomModel;
    constructor(model, roomModel) {
            this.model=model;
            this.roomModel=roomModel;
    }

    async getTaskList(login:string,room:string){
        
        const filds = [`users.${login}`, 'room'];
        const fildsVal = [{ '$exists': false }, room];
        const filds1 = [`users.${login}`, 'room'];
        const fildsVal1 = [true, room];
        return await Storage.getItemWithOrConditionally(this.model, filds, fildsVal, filds1, fildsVal1, ["_id", 'title', 'description', 'date', 'time', 'period']);
    }
    async getTask(id:string):Promise<{_id:string,title:string,time:string,period:string}| Error>{
        try{
            const task:{_id:string,title:string,time:string,period:string}=await Storage.getItemByID(Task, id, ['_id', 'title', 'time', 'period', 'description']);
            if(!task)
            throw "task not faund";
            else
            return task;
        }
        catch(e){
            console.log(e)
            return e as Error;
        }
    }
    async deleteItem(id:string){ 
        await Storage.deleteItem(Task, "_id", id);
    }
    async addItem(task:Task,room:string){
        try{
        await Storage.addItem(Task, { ...task, room });
        }
        catch(e){
            console.log(e);
            return e;
        }
    }
};

export const taskResurce=new TaskResurce(Task,Room);
  