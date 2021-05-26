"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.chatMsg = exports.ChatMsgHanlder = void 0;
var ObserverWrapper_1 = require("./../../wrappers/ObserverWrapper");
var MsgStorage_1 = require("../Storages/MsgStorage");
var t_bot_1 = require("./../../chatbots/t_bot");
var chatbot_resurce_1 = require("./../../resurce/chatbot.resurce");
var ChatMsgHanlder = /** @class */ (function (_super) {
    __extends(ChatMsgHanlder, _super);
    function ChatMsgHanlder(msgStorage, res) {
        var _this = _super.call(this) || this;
        _this.msgStorage = msgStorage;
        _this.resurce = res;
        return _this;
    }
    ChatMsgHanlder.prototype.sendMessageInMessanger = function (roomID, loginUser, msg) {
        return __awaiter(this, void 0, void 0, function () {
            var bots;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resurce.getClients(roomID)];
                    case 1:
                        bots = _a.sent();
                        bots.forEach(function (e) { return t_bot_1.tbot.sendMessage(e, loginUser + ": " + msg); });
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatMsgHanlder.prototype.handelMsg = function (socket, data) {
        return __awaiter(this, void 0, void 0, function () {
            var roomID, date, loginUser, msg, responseData, obj, clients;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        roomID = data.roomID, date = data.date, loginUser = data.loginUser, msg = data.msg;
                        return [4 /*yield*/, this.sendMessageInMessanger(roomID, loginUser, msg)];
                    case 1:
                        _a.sent();
                        responseData = { msg: msg, date: date, loginUser: loginUser };
                        this.msgStorage.updateItemByName(roomID, ["chat"], responseData);
                        obj = this.msgStorage.getItemByName(roomID, "clients");
                        if (obj.filter !== undefined) {
                            clients = this.msgStorage.getItemByName(roomID, "clients").filter(function (e) { return e != socket.socket; });
                            this.notifyObservers([socket.socket, { type: "chat_msg", clients: clients, message: [responseData] }, "all"]);
                            return [2 /*return*/, { type: "chat_msg", clients: clients, message: [responseData] }];
                        }
                        else {
                            this.resurce.setChat(roomID, [responseData]);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return ChatMsgHanlder;
}(ObserverWrapper_1.ObservableWrapper));
exports.ChatMsgHanlder = ChatMsgHanlder;
exports.chatMsg = new ChatMsgHanlder(MsgStorage_1.msgStorage, chatbot_resurce_1.chatResurce);
