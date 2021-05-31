import { TaskList } from './../classes/tasksHandler';
import {taskResurce,TaskResurce,Task} from './../resurce/task.resurce';
import {reqValidator,ReqValidator} from './../classes/ReqValidator'

export class TaskController {
    private taskResurce:TaskResurce;
    private tasksList:typeof TaskList;
    private validator:ReqValidator;
    constructor(taskResurce:TaskResurce, TasksList:typeof TaskList,validator:ReqValidator) {
        this.taskResurce = taskResurce;
        this.tasksList = TasksList;
        this.validator=validator;
    }
    async getTaskList(mode:string, date:string, login:string, room:string) {
        try {

            return new this.tasksList(await this.taskResurce.getTaskList(login, room), mode, date).getTasks();
        }
        catch (e) {
            console.log(e);
            return e;
        }
    }
    async getTask(id:string):Promise<{_id: string;title: string;time: string;period: string;} | Error>{
        try{
          return   await this.taskResurce.getTask(id);
        }
        catch(e){
            console.log(e)
            return e;
        }
    }
    async deleteTask(id:string){
        try{
            await this.taskResurce.deleteItem(id);
        }
        catch(e){
            console.log(e);
            return e;
        }
    }
    async addTask(task:Task,room:string){

            const obj={title:task.title as string,date:task.date as string,time:task.time as string,users:task.users}
            let result:Array<number|boolean>=this.validator.validate(obj);
            result=result.filter(e=> e!==true);
            if(result.length===0)
            await this.taskResurce.addItem(task, room)
            else
                throw new Error(JSON.stringify(result));


    }
}


export const taskController=new TaskController(taskResurce,TaskList,reqValidator);