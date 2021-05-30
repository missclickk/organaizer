import { Router } from 'express';
import { userController,UserController } from './../controllers/user.controller';


export class UserRouter{
    private router:Router;
    private userController:UserController;
    constructor(router:any, userController:UserController) {
        this.router = router;
        this.userController = userController;
        this.setupRouter();
    };

    private setupRouter():void {
        this.router.get('/auth',async (req,res)=>{
            const { email, password } = req.headers;
            return this.userController.getUser(email as string,password as string)
            .then((item)=>res.status(200).json(item))
            .catch((e)=>res.status(400).json({msg:e}));
        })

        this.router.post('/registr',async (req,res)=>{
            const { email, login, password, room,rPassword } = req.body;
           try{
            let item= await this.userController.createUser(email,login,password,rPassword,room)
            return  item.type==="data"?res.status(200).json({room:item.room,login:item.login}):res.status(400).json({message:item.message});
           }
           catch(e){
                console.log(e)
                return res.status(500).json({message:"что-то пошло не так!"});
           }
        })
        
        this.router.get('/list',async (req,res)=>{
            const roomId = req.headers.room;
            return this.userController.getUserList(roomId as string)
            .then(items=>res.status(200).json({logins:(items as {login:string,_id:string}[]).map(e => e.login)}))
            .catch((e) => {
                console.log(e);
                res.status(500).json({ msg: ["error"] });
            })
        })    
    }

    getRouter():Router {
        return this.router;
    }
}


export const userRouter=new UserRouter(Router(), userController).getRouter();