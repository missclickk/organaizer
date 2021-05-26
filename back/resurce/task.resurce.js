const Task = require('./../models/Task')
const Room = require('./../models/Room')
const {Storage}=require('./../classes/Storage')
class TaskResurce {
    #model;
    #roomModel;
    constructor(model, roomModel) {
            this.#model=model;
            this.#roomModel=roomModel;
    }
   async getTaskList(login,room){
            const filds = [`users.${login}`, 'room'];
            const fildsVal = [{ '$exists': false }, room];
            const filds1 = [`users.${login}`, 'room'];
            const fildsVal1 = [true, room];
            return await Storage.getItemWithOrConditionally(this.#model, filds, fildsVal, filds1, fildsVal1, ["_id", 'title', 'description', 'date', 'time', 'period']);
        
    };
    async getTask(id){
        try{
            const task=await Storage.getItemByID(Task, id, ['_id', 'title', 'time', 'period', 'description']);
            if(!task)
            throw "task not faund";
            else
            return task;
        }
        catch(e){
            console.log(e)
            return e;
        }
    }
    async deleteItem(id){ 
        await Storage.deleteItem(Task, "_id", id);
    }
    async addItem(task,room){
        try{
        await Storage.addItem(Task, { ...task, room });
        }
        catch(e){
            console.log(e);
            return e;
        }
    }
}

module.exports={TaskResurce,taskResurce:new TaskResurce(Task,Room)}