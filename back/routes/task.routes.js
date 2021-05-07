const { Router } = require('express');
const { taskController } = require('./../controllers/task.controller');
class TaskRoutes {
    #router;
    #taskController;
    constructor(router, taskController) {
        this.#router = router;
        this.#taskController = taskController;
        this.#setupRouter();
    }
    #setupRouter() {
        this.#router.post('/one', async (req, res) => {
            try {
                const { task, room } = req.body;
                this.#taskController.addTask(task, room);
                return res.status(200).json({ msg: ['created!!'] });
            }
            catch (e) {
                console.log(e);
                return res.status(400).json({ msg: ['ошибка!'] });
            }
        })
        
        this.#router.get('/one',async(req,res)=>{
                 return  await this.#taskController.getTask(req.headers.id)
                 .then((task)=>res.status(200).json(task)).catch(()=>res.status(404).json({msg:["wrong data"]}));
                
        })

        this.#router.get('/list', async (req, res) => {
            const { room, login, mode, _date } = req.headers;
            return await this.#taskController.getTaskList(mode, _date, login, room)
                .then((tasks) => res.status(200).json({ tasks }))
                .catch((e) => res.status(400).json({ msg: 'ошибка в запросе!' }))

        })

        this.#router.delete('/one',async(req,res)=>{
            try{
               await this.#taskController.deleteTask( req.headers.target);
                res.status(200).json({msg:["sucsses"]})
            }
            catch(e){
                console.log(e);
                res.status(400).json({msg:["error with deleting"]});
            }
        })



    }
    get router() {
        return this.#router;

    }
}

module.exports = { TaskRoutes, taskRouter: new TaskRoutes(Router(), taskController).router };