import { userResurce,UserResurce } from './../resurce/user.resurce';
import { reqValidator, ReqValidator } from './../classes/ReqValidator';
import * as bcrypt from "bcryptjs";


export class UserController {
    private resurce:UserResurce;
    private bcrypt;
    private validator: ReqValidator;
    constructor(userResurce:UserResurce, reqValidator: ReqValidator, bcrypt) {
        this.resurce = userResurce;
        this.validator = reqValidator;
        this.bcrypt = bcrypt;
    }

    async addBotLink(email: string, password: string,chatId:string): Promise<{ message: string }> {
        try {
            
            const result: Error | { login: string, room: string } = await this.getUser(email, password);
            const resultAsError: Error = result as Error;
            const user: { login: string, room: string } = result as { login: string, room: string };
            if (resultAsError.message) {
                return { message: resultAsError.message }
            }
            else {
                await this.resurce.addChatId(email,chatId);
                return { message:"ok"};
            }
        }
        catch (e) {
            console.log(`user.controller 70 ${e.message}`);
        }
    }
 
    async getUserList(roomId: string): Promise<Array<{ _id: string, login: string }> | Error> {
        const users: Array<{ _id: string, login: string }> = await this.resurce.getList(roomId);
        if (users.length !== 0)
            return users;
        else return new Error("ошибка")

    }

    async getUser(email: string, password: string): Promise<{ login: string, room: string } | Error> {
        try {

            if (this.validator.validate({ email })[0] === 1)
                throw new Error("неправильный email");
            const user:{_id:string,login:string,password:string,room:string}= await this.resurce.getUser(email);
            if (!user)
                throw new Error("email не найден");
            if (await this.bcrypt.compare(password, user[0].password)) {
                return { login: user[0].login, room: user[0].room };
            }
            else throw new Error("email не найден");
        }
        catch (e) {
            console.log(e)
            return e;
        }


    }

    async createUser(email: string, reqlogin: string, password: string,rPassword:string,reqroom: string|undefined): Promise<{ type: string, room?: string, login?: string, message?: Array<string> }> {
        try {
            if (await this.resurce.emailIsExist(email))
                throw new Error(JSON.stringify([1]));

            const validateResult = this.validator.validate({ email, login: reqlogin, password,rPassword }).filter(e => e !== true);
            console.log("here");
            console.log(validateResult);
            if (validateResult.length > 0)
                throw new Error(JSON.stringify(validateResult));

            const hashedPassword = await this.bcrypt.hash(password, 12);
            const { room, login } = await this.resurce.createUser(email, reqlogin, hashedPassword, reqroom);
            return { room, login, type: "data" };
        }
        catch (e) {
            console.log(`user.controller 55 ${e}`);
            return { type: "error", message: [e.message] };
        }
    }

}




export const userController = new UserController(userResurce, new ReqValidator(), bcrypt);