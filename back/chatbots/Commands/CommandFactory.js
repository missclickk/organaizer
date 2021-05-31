"use strict";
exports.__esModule = true;
exports.CommandFactory = void 0;
var user_controller_1 = require("../../controllers/user.controller");
var chat_message_handler_1 = require("./../../webChat/MessageHandler/chat.message.handler");
var user_resurce_1 = require("./../../resurce/user.resurce");
var ReqValidator_1 = require("./../../classes/ReqValidator");
var todo_resurce_1 = require("./../../resurce/todo.resurce");
var task_resurce_1 = require("./../../resurce/task.resurce");
var RegCommand_1 = require("./RegCommand");
var SendCommand_1 = require("./SendCommand");
var SendKeyBoardCommand_1 = require("./SendKeyBoardCommand");
var CreateTodoCommand_1 = require("./CreateTodoCommand");
var CreateTaskCommand_1 = require("./CreateTaskCommand");
var CommandFactory = /** @class */ (function () {
    function CommandFactory() {
    }
    CommandFactory.prototype.createCommand = function (type, args, chatId, date) {
        switch (type) {
            case "/reg":
                return new RegCommand_1.RegCommand(args, chatId, user_controller_1.userController.addBotLink.bind(user_controller_1.userController));
            case "/send":
                return new SendCommand_1.SendCommand(args, chatId, date, chat_message_handler_1.chatMsg.handelMsg.bind(chat_message_handler_1.chatMsg), user_resurce_1.userResurce);
            case "/create_todo":
                return new SendKeyBoardCommand_1.SendKeyBoardCommand(SendKeyBoardCommand_1.KEYBOARD_TYPE.USERS, args, chatId, user_resurce_1.userResurce, CreateTodoCommand_1.CreateToDoWrapper);
            case "create_todo_sec":
                return new CreateTodoCommand_1.CreatTodoCommand(args, todo_resurce_1.todoResurce, ReqValidator_1.reqValidator);
            case "/create_task":
                return new SendKeyBoardCommand_1.SendKeyBoardCommand(SendKeyBoardCommand_1.KEYBOARD_TYPE.DEFAULT, args, chatId, user_resurce_1.userResurce, CreateTaskCommand_1.CreateTaskWrapper);
            case "create_task_sec":
                return new CreateTaskCommand_1.CreateTaskCommand(args, task_resurce_1.taskResurce, ReqValidator_1.reqValidator);
            case "/send_users":
                return new SendKeyBoardCommand_1.SendKeyBoardCommand(SendKeyBoardCommand_1.KEYBOARD_TYPE.USERS, args, chatId, user_resurce_1.userResurce, function () { });
            default:
                throw new Error("command not available");
        }
    };
    return CommandFactory;
}());
exports.CommandFactory = CommandFactory;
