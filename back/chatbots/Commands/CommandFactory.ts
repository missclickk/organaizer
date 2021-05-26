import { Command } from './Command'
import { userController } from '../../controllers/user.controller'
import { chatMsg } from './../../webChat/MessageHandler/chat.message.handler'
import { userResurce} from './../../resurce/user.resurce'
import {reqValidator} from './../../classes/ReqValidator'
import {todoResurce} from './../../resurce/todo.resurce'
import { RegCommand } from './RegCommand'
import { SendCommand } from './SendCommand'
import { SendKeyBoardCommand} from './SendKeyBoardCommand'
import {CreateToDoWrapper,CreatTodoCommand} from './CreateTodoCommand'

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
                return new SendKeyBoardCommand(args,chatId,userResurce,CreateToDoWrapper);
            case "create_todo_sec":
                return new CreatTodoCommand(args,todoResurce,reqValidator);
            default:
                throw new Error("command not available")
        }
    }
}