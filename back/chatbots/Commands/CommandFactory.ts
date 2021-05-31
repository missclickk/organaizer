import { Command } from './Command'
import { userController } from '../../controllers/user.controller'
import { chatMsg } from './../../webChat/MessageHandler/chat.message.handler'
import { userResurce} from './../../resurce/user.resurce'
import {reqValidator} from './../../classes/ReqValidator'
import {todoResurce} from './../../resurce/todo.resurce'
import {taskResurce} from './../../resurce/task.resurce'
import { RegCommand } from './RegCommand'
import { SendCommand } from './SendCommand'
import { KEYBOARD_TYPE,SendKeyBoardCommand} from './SendKeyBoardCommand'
import {CreateToDoWrapper,CreatTodoCommand} from './CreateTodoCommand'
import {CreateTaskWrapper,CreateTaskCommand} from './CreateTaskCommand'

export class CommandFactory {
    constructor() {
    }
    createCommand(type: string, args: Array<string> | null, chatId?: string, date?: string): Command {
        switch (type) {
            case "/reg":
                return new RegCommand(args, chatId, userController.addBotLink.bind(userController));
            case "/send":
                return new SendCommand(args, chatId, date, chatMsg.handelMsg.bind(chatMsg), userResurce);
            case "/create_todo":
                return new SendKeyBoardCommand(KEYBOARD_TYPE.USERS,args,chatId,userResurce,CreateToDoWrapper);
            case "create_todo_sec":
                return new CreatTodoCommand(args,todoResurce,reqValidator);
            case "/create_task":
                return new SendKeyBoardCommand(KEYBOARD_TYPE.DEFAULT,args,chatId,userResurce,CreateTaskWrapper);    
            case "create_task_sec":
                return new CreateTaskCommand(args,taskResurce,reqValidator);    
            case "/send_users":
                return new SendKeyBoardCommand(KEYBOARD_TYPE.USERS,args,chatId,userResurce,()=>{});
            default:
                throw new Error("command not available")
        }
    }
}