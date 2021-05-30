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
exports.messageDistributor = exports.MessageDistributor = void 0;
var ObserverWrapper_1 = require("./../../wrappers/ObserverWrapper");
var SocketStorage_1 = require("./../Storages/SocketStorage");
var chat_message_handler_1 = require("./chat.message.handler");
var reg_message_handler_1 = require("./reg.message.handler");
var disconnect_message_handler_1 = require("./disconnect.message.handler");
var MessageDistributor = /** @class */ (function (_super) {
    __extends(MessageDistributor, _super);
    function MessageDistributor(reg, chat, disconnectHanlder, socketStorage) {
        var _this = _super.call(this) || this;
        _this.regHandel = reg;
        _this.chatHandel = chat;
        _this.socketStorage = socketStorage;
        _this.disconnectHanlder = disconnectHanlder;
        _this.chatHandel.registrObserver(_this);
        _this.regHandel.registrObserver(_this);
        return _this;
    }
    MessageDistributor.prototype.getSocket = function (socket, roomID) {
        var obj = this.socketStorage.getItemByName(socket);
        if (obj.id !== undefined)
            return obj;
        else {
            var test = { socket: socket, id: Date.now().toString(), roomId: roomID };
            this.socketStorage.setItemByName(socket, test);
            return this.getSocket(socket);
        }
    };
    MessageDistributor.prototype.deleteSocket = function (socket) {
        this.socketStorage.deleteItemByName(socket);
    };
    MessageDistributor.prototype.handelIncomingMsg = function (socket, message) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, msg, roomID, type, date, loginUser, cSocket, _b, resReg, res, sockt, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = JSON.parse(message), msg = _a.msg, roomID = _a.roomID, type = _a.type, date = _a.date, loginUser = _a.loginUser;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 8, , 9]);
                        cSocket = this.getSocket(socket, roomID);
                        _b = type;
                        switch (_b) {
                            case 'reg': return [3 /*break*/, 2];
                            case 'msg': return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 6];
                    case 2: return [4 /*yield*/, this.regHandel.handelMsg(cSocket, { roomID: roomID })
                        //  return { data: resReg, mode: "sender" };
                    ];
                    case 3:
                        resReg = _c.sent();
                        //  return { data: resReg, mode: "sender" };
                        return [3 /*break*/, 7];
                    case 4: return [4 /*yield*/, this.chatHandel.handelMsg(cSocket, { msg: msg, roomID: roomID, date: date, loginUser: loginUser })];
                    case 5:
                        res = _c.sent();
                        //  return { data: res, mode: "all" };
                        return [3 /*break*/, 7];
                    case 6:
                        sockt = this.getSocket(socket);
                        this.disconnectHanlder.handelMsg(sockt);
                        this.deleteSocket(sockt);
                        return [3 /*break*/, 7];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        e_1 = _c.sent();
                        console.log(e_1);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    MessageDistributor.prototype.update = function (args) {
        switch (args[2]) {
            case "sender":
                this.notifyObservers([args[0], { data: args[1], mode: "sender" }]);
                break;
            case "all":
                this.notifyObservers([args[0], { data: args[1], mode: "all" }]);
                break;
            default:
                break;
        }
    };
    return MessageDistributor;
}(ObserverWrapper_1.ObservableWrapper));
exports.MessageDistributor = MessageDistributor;
exports.messageDistributor = new MessageDistributor(reg_message_handler_1.regMsg, chat_message_handler_1.chatMsg, disconnect_message_handler_1.disconnectHanlder, new SocketStorage_1.SocketStorage());
