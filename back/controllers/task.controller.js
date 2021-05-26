 const { TaskList } = require('./../handlers/tasksHandlers');
const {taskResurce}=require('./../resurce/task.resurce');

class TaskController {
    #taskResurce;
    #tasksList;
    constructor(taskResurce, TasksList) {
        this.#taskResurce = taskResurce;
        this.#tasksList = TasksList;
    }
    async getTaskList(mode, date, login, room) {
        try {
            return new this.#tasksList(await this.#taskResurce.getTaskList(login, room), mode, date).tasks;
        }
        catch (e) {
            console.log(e);
            return e;
        }
    }
    async getTask(id){
        try{
          return   await this.#taskResurce.getTask(id);
        }
        catch(e){
            console.log(e)
            return e;
        }
    }

    async deleteTask(id){
        try{
            await this.#taskResurce.deleteItem(id);
        }
        catch(e){
            console.log(e);
            return e;
        }
    }
    async addTask(task,room){
        try{
            await this.#taskResurce.addItem(task, room)
        }
        catch(e){
            console.log(e)
            return e;
        }
    }
}
module.exports = { TaskController, taskController: new TaskController(taskResurce, TaskList) };