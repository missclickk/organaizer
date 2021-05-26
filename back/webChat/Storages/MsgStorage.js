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
exports.msgStorage = exports.MsgStorage = void 0;
var chatBot_resurce_1 = require("../../resurce/chatBot.resurce");
var MsgStorage = /** @class */ (function () {
    function MsgStorage(resurce) {
        this.cache = new Map();
        this.resurce = resurce;
    }
    MsgStorage.prototype.setItemByName = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var room, ids;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resurce.getClients(key)];
                    case 1:
                        ids = _a.sent();
                        room = { clients: [value], chatBots: ids };
                        this.cache.set(key, room);
                        return [2 /*return*/, 1];
                }
            });
        });
    };
    MsgStorage.prototype.updateItemByName = function (key, subKey, value) {
        return __awaiter(this, void 0, void 0, function () {
            var room;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.cache.has(key)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.setItemByName(key, value)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        room = this.cache.get(key);
                        room[subKey[0]] ? room[subKey[0]].push(value) : room[subKey[0]] = [value];
                        this.cache.set(key, room);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    MsgStorage.prototype.getItemByName = function (key, value) {
        var art = this.cache.has(key.toString());
        var buf;
        if (!this.cache.has(key.toString()))
            return false;
        buf = this.cache.get(key.toString());
        if (buf[value]) {
            return buf[value];
        }
        return false;
    };
    ;
    MsgStorage.prototype.deleteItemByName = function (key) {
        return this.cache["delete"](key);
    };
    ;
    return MsgStorage;
}());
exports.MsgStorage = MsgStorage;
exports.msgStorage = new MsgStorage(chatBot_resurce_1.chatResurce);
