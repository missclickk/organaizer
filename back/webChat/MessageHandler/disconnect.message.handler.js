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
exports.disconnectHanlder = exports.DisconnectHanlder = void 0;
var TimersStorage_1 = require("./../Storages/TimersStorage");
var MsgStorage_1 = require("./../Storages/MsgStorage");
var chatbot_resurce_1 = require("./../../resurce/chatbot.resurce");
/*
    -получаем элементы map по socekt.roomID
    - в массиве clients удаляем элемент равный socket.socket===clients[i];
    -проверяем длину  clients, если она равна 0, то создаем таймер.
    -когда таймер сробатывает, происходит запись в бд, удаление таймера, удаление записи в msgStorage;
  
  */
var DisconnectHanlder = /** @class */ (function () {
    function DisconnectHanlder(timer, msg, resurce) {
        this.msgStore = msg;
        this.timerStore = timer;
        this.resurce = resurce;
    }
    DisconnectHanlder.prototype.deleteCacheEnty = function (socket) {
        return __awaiter(this, void 0, void 0, function () {
            var obj;
            return __generator(this, function (_a) {
                obj = this.msgStore.getItemByName(socket.roomId, "chat");
                if (obj.concat !== undefined && obj.length > 0)
                    this.resurce.setChat(socket.roomId, obj);
                this.msgStore.deleteItemByName(socket.roomId);
                this.timerStore.deleteItemByName(socket.roomId);
                return [2 /*return*/];
            });
        });
    };
    DisconnectHanlder.prototype.setTimer = function (socket) {
        this.timerStore.setItemByName(socket.roomId, setTimeout(this.deleteCacheEnty.bind(this, socket), 3000));
    };
    DisconnectHanlder.prototype.handelMsg = function (socket) {
        var clients = this.msgStore.getItemByName(socket.roomId, "clients");
        var obj = clients;
        if (obj.indexOf === undefined || obj.splice === undefined)
            throw new Error("this clients or room not exists");
        obj.splice(obj.indexOf(socket.socket), 1);
        console.log(obj.length);
        if (obj.length === 0)
            this.setTimer(socket);
        else
            this.msgStore.updateItemByName(socket.roomId, ["clients"], obj);
    };
    return DisconnectHanlder;
}());
exports.DisconnectHanlder = DisconnectHanlder;
exports.disconnectHanlder = new DisconnectHanlder(TimersStorage_1.timersStorage, MsgStorage_1.msgStorage, chatbot_resurce_1.chatResurce);
