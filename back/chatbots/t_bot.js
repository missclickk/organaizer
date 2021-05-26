"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.tbot = exports.TBot = void 0;
var TelegramBot = require("node-telegram-bot-api");
var CommandFactory_1 = require("./Commands/CommandFactory");
var CommandExecutor_1 = require("./CommandExecutor");
var CHAT_STATUS;
(function (CHAT_STATUS) {
    CHAT_STATUS[CHAT_STATUS["MESSAGE"] = 0] = "MESSAGE";
    CHAT_STATUS[CHAT_STATUS["MESSAGE_CHAIN"] = 1] = "MESSAGE_CHAIN";
    CHAT_STATUS[CHAT_STATUS["KEYBOARD_CHAIN"] = 2] = "KEYBOARD_CHAIN";
})(CHAT_STATUS || (CHAT_STATUS = {}));
var TOKEN = "1751041214:AAGNTL9PX2k0TWCUoj2pdTiS5Xr_5oeLoik";
var TBot = /** @class */ (function () {
    function TBot(token, tBot, executor) {
        this.chatState = new Map();
        this.token = token;
        this.createBot(tBot);
        this.executor = executor;
    }
    TBot.prototype.createBot = function (bot) {
        this.bot = new bot(this.token, {
            polling: {
                interval: 300,
                autoStart: true,
                params: {
                    timeout: 10
                }
            }
        });
    };
    TBot.prototype.sendKeyboard = function (chatId, msg, keyboard) {
        this.bot.sendMessage(chatId, msg, {
            reply_markup: {
                keyboard: keyboard
            }
        });
    };
    TBot.prototype.closeKeyboard = function (chatId, msg) {
        this.bot.sendMessage(chatId, msg, {
            reply_markup: {
                remove_keyboard: true
            }
        });
    };
    TBot.prototype.sendMessage = function (chatId, msg) {
        this.bot.sendMessage(chatId, msg);
    };
    TBot.prototype.parseText = function (text) {
        var commandAndArgs = text.split(" ");
        var type = commandAndArgs[0].substring(0, 1) === "/" ? commandAndArgs.shift() : "notACommand";
        var args = commandAndArgs.filter(function (e) { return e !== " "; });
        return { type: type, args: args };
    };
    TBot.prototype.handelMessage = function (response) {
        if (response.chatId === undefined)
            return true;
        var res = response;
        this.chatState.set(res.chatId, { wrapper: res.fn, status: CHAT_STATUS.KEYBOARD_CHAIN, state: [] });
    };
    TBot.prototype.handelChain = function (text, chatId) {
        switch (text) {
            case "отмена":
                this.closeKeyboard(chatId, "ОТМЕНИТЬ");
                this.chatState["delete"](chatId);
                break;
            case "далее":
                var obj = this.chatState.get(chatId);
                this.chatState["delete"](chatId);
                obj.wrapper(obj.state).execute();
                break;
            default:
                var state = this.chatState.get(chatId).state;
                var index = state.indexOf(text);
                if (index === -1) {
                    state.push(text);
                    this.sendMessage(chatId, "\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C " + text + " \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u2705");
                }
                else {
                    state.splice(index, 1);
                    this.sendMessage(chatId, "\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C " + text + " \u0443\u0434\u0430\u043B\u0435\u043D \u274C");
                }
                break;
        }
    };
    TBot.prototype.start = function () {
        var _this = this;
        this.bot.on('message', function (msg) { return __awaiter(_this, void 0, void 0, function () {
            var text, chat, date, _a, type, args, _b, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 5]);
                        text = msg.text, chat = msg.chat, date = msg.date;
                        if (!!this.chatState.has(chat.id)) return [3 /*break*/, 2];
                        _a = this.parseText(text), type = _a.type, args = _a.args;
                        _b = this.handelMessage;
                        return [4 /*yield*/, this.executor.getCommandResult(type, args, chat.id, date)];
                    case 1:
                        _b.apply(this, [_c.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        this.handelChain(msg.text, chat.id);
                        _c.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        e_1 = _c.sent();
                        this.sendMessage(msg.chat.id, "ПАЦАНЫ, ЦЕНИТЕ МАТЬ!");
                        console.log(e_1.stack);
                        console.log(e_1.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    };
    ;
    return TBot;
}());
exports.TBot = TBot;
exports.tbot = new TBot(TOKEN, TelegramBot, new CommandExecutor_1.CommandExecutor(new CommandFactory_1.CommandFactory()));
