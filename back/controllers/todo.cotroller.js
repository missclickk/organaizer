const {todoResurce}=require('./../resurce/todo.resurce');

class TodoController{
    #todoResurce;
    constructor(todoResurce){   
        this.#todoResurce=todoResurce; 
    }

    async #tryCatchWrapper(callback,...args){
                    try{
                          return  await callback(args);
                    }
                    catch(e){
                      console.log(e)
                      return e;
                    }
    }
    async getTodos(room,user){
    return await this.#tryCatchWrapper(async (args)=>await this.#todoResurce.getTodos(...args),room,user);
    }
    async addTodo({todo,room}){
        try{
               if(!await this.#todoResurce.addItem(todo,room))
                    throw new Error("todo not created")
        }
        catch(e){
            console.log(e)
            return e;
        }
    }
    async deleteTodo(id){
        try{
            await this.#todoResurce.deleteItem(id);
        }
        catch(e){
            console.error(e);
            return e;
        }
    }


    async addTask({ id, task }){
    return await this.#tryCatchWrapper(async(args)=> await this.#todoResurce.addTask(...args),id,task)
    }
    async setTask(id,task,value){
        return await  this.#tryCatchWrapper((args)=>this.#todoResurce.setTask(...args),id,task,value)
    }
}


module.exports={todoController:new TodoController(todoResurce)}