const Todo = require('./../models/Todo')
const Room = require('./../models/Room')
const {Storage}=require('./../classes/Storage')

class TodoResurce {
    #model;
    #roomModel;
    constructor(model, roomModel) {
        this.#model = model;
        this.#roomModel = roomModel
    }   
    async getTodos(room, user) {
        try {

            const filds = [`users.${user}`, 'room'];
            const fildsVal = [{ '$exists': false }, room];
            const filds1 = [`users.${user}`, 'room'];
            const fildsVal1 = [true, room];
       //     console.log(await Storage.getItemWithOrConditionally(this.#model, filds, fildsVal, filds1, fildsVal1, ['_id', 'title', 'tasks']))
            return await Storage.getItemWithOrConditionally(this.#model, filds, fildsVal, filds1, fildsVal1, ['_id', 'title', 'tasks']);

        }
        catch (e) {
            console.log(e)
            return Error(e);
        }
    }
    async addItem(todo, room) {
        console.log(todo);
        console.log(room);
        let obj;
        if (obj = await Storage.addItem(this.#model, { ...todo, room }, true)) {
            await Storage.pushItem(this.#roomModel, { _id: room }, 'todos', obj._id);
            return true;
        }
        return false;
    }

    async deleteItem(id){
        try{
        await Storage.deleteItem( this.#model, "_id",id);
    }
        catch(e){
            console.log(e);
            return e;
        }
    }
    async addTask(id,task){
        try{
            await Storage.pushItem( this.#model, { _id: id }, 'tasks', { name: task, value: true });
        }
        catch(e){
            console.log(e);
            return e;
        }
    }
    async setTask(id,task,value){
        try{
            await Storage.setItem( this.#model, { _id: id, 'tasks.name': task }, 'tasks.$.value', !value);
        }
        catch(e){
            console.log(e);
            return e;
        }
    }
}

module.exports = { todoResurce: new TodoResurce(Todo, Room) };