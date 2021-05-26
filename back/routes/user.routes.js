const { Router } = require('express');
const { userController } = require('./../controllers/user.controller');


class UserRouter {
    #router;
    #userController;
    constructor(router, userController) {
        this.#router = router;
        this.#userController = userController;
        this.#setupRouter()
    };
    #setupRouter() {
        this.#router.get('/auth',async (req,res)=>{
            const { email, password } = req.headers;
            return this.#userController.getUser(email,password)
            .then((item)=>res.status(200).json(item))
            .catch((e)=>res.status(400).json({msg:e}));
        })

        this.#router.post('/registr',async (req,res)=>{
            const { email, login, password, room } = req.body;
           try{
            let item= await this.#userController.createUser(email,login,password,room)
            console.log(item);
            return  item.type==="data"?res.status(200).json({room:item.room,login:item.login}):res.status(400).json({message:item.message});
           }
           catch(e){
                console.log(e)
                return res.status(500).json({message:"что-то пошло не так!"});
           }
        })
        
        this.#router.get('/list',async (req,res)=>{
            const roomId = req.headers.room;
            return this.#userController.getUserList(roomId)
            .then(items=>res.status(200).json({logins:items.map(e => e.login)}))
            .catch((e) => {
                console.log(e);
                res.status(500).json({ msg: ["error"] });
            })
        })    
    }

    get router() {
        return this.#router;
    }
}

module.exports = { userRouter: new UserRouter(Router(), userController).router };