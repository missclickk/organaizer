const { userResurce } = require('./../resurce/user.resurce');
const { reqValidator } = require('./../classes/ReqValidator');
const bcrypt = require('bcryptjs');

class UserController {
    #resurce;
    #validator;
    constructor(userResurce, reqValidator) {
        this.#resurce = userResurce;
        this.#validator = reqValidator;
    }
    async getUserList(roomId) {
        const users = await this.#resurce.getList(roomId);
        if (users.length !== 0)
            return users;
        else return new Error("ошибка")

    }

    async getUser(email, password) {
        try {
            if (this.#validator.validate({ email })[0] === 1)
                throw new Error("неправильный email");
            const user =  await this.#resurce.getUser(email);
            if (!user)
                throw new Error("email не найден");
                console.log(user)
           if (await bcrypt.compare(password, user[0].password)) {
                return { login: user[0].login, room: user[0].room };
           }
           else     throw new Error("email не найден");
        }
        catch (e) {
            return e;
        }


    }

    async createUser(email, reqlogin, password, reqroom) {
        try {
            if (await this.#resurce.emailIsExist(email))
                throw new Error("email занят");
            
            const validateResult=this.#validator.validate({ email,login:reqlogin,password}).filter(e=>e!=true);
            
            if(validateResult.length>0)
                throw new Error("неправильный emailблоги или пароль");

            const hashedPassword = await bcrypt.hash(password, 12);
            const { room, login } = await this.#resurce.createUser(email, reqlogin, hashedPassword, reqroom);
            return { room, login,type:"data" };
        }
        catch (e) {
            console.log(`${e}`);
            return {type:"error",message:[e.message]};
        }
    }
}


module.exports={userController:new UserController(userResurce,reqValidator)};