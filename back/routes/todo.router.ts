import { Router } from 'express'
import { todoController } from './../controllers/todo.cotroller';


export class TodoRouter {
    private router:Router;
    private todoController;
    constructor(router:Router, todoController) {
        this.router = router;
        this.todoController = todoController;
        this.setupRouter()
    };
    private setupRouter():void {
        this.router.get('/lists',
            async (req, res) => {
               const {room,user}=req.headers;
                return this.todoController.getTodos(room,user)
                    .then((items) => res.status(200).json({ todo: items }))
                    .catch((e) => {
                        console.log(e);
                        res.status(500).json({ msg: ["error"] });
                    })
            })
        this.router.post('/lists',
            async (req, res) => {
                try {
                    this.todoController.addTodo(req.body);
                    return res.status(200).json({ message: "list created" })
                }
                catch (e) {
                    console.log(e);
                    res.status(400).json({ message: ["список не создан"] })
                }

            }
        )
        this.router.delete('/lists', async (req, res) => {
            try {
                this.todoController.deleteTodo(req.headers.target);
                return res.status(200).json({ msg: ["удален"] });
            }
            catch (e) {
                return res.status(400).json({ msg: ["не удален"] })
            }
        })
        this.router.post('/task',async(req,res)=>{  
            try{
            await  this.todoController.addTask(req.body);
            return res.status(200).json({ msg:[ "todo task created!"] });
            }
            catch(e){
                console.log(e);
                return res.status(400).json({msg:["некоректный запрос"]})
            }
        })
        this.router.patch('/task',async(req,res)=>{
            try{
                const { id, task, value } = req.body;
                await  this.todoController.setTask(id,task,value);
                res.status(200).json({ msg:['успешно обновлено']});
            }
            catch(e){   
                console.log(e);
                return res.status(400).json({msg:["некоректный запрос"]})  
            }
        })
    
    }

    getRouter():Router {
        return this.router;
    }
}

export const todoRouter=new TodoRouter(Router(),todoController).getRouter();