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
exports.userResurce = exports.UserResurce = void 0;
var Room = require("../models/Room");
var User = require("../models/User");
var Storage_1 = require("../classes/Storage");
var UserResurce = /** @class */ (function () {
    function UserResurce(model, roomModel, storage) {
        this.model = model;
        this.roomModel = roomModel;
        this.Storage = storage;
    }
    UserResurce.prototype.getList = function (roomId) {
        return __awaiter(this, void 0, void 0, function () {
            var usersIds, ids;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Storage.getItemWithConditionally(this.roomModel, ["_id"], [roomId], ['users'])];
                    case 1:
                        usersIds = _a.sent();
                        ids = usersIds[0].users;
                        return [4 /*yield*/, this.Storage.getIncludesItems(User, "_id", ids, ['login'])];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserResurce.prototype.getListByChatId = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            var room;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserByChatId(chatId)];
                    case 1:
                        room = (_a.sent()).room;
                        return [4 /*yield*/, this.getList(room)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserResurce.prototype.getUserByChatId = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Storage.getItemWithConditionally(this.model, ["chatId"], [chatId], ['login', 'room'])];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, { login: data[0].login, room: data[0].room }];
                }
            });
        });
    };
    UserResurce.prototype.getUser = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log(this.model, User);
                        return [4 /*yield*/, this.Storage.getItemWithConditionally(this.model, ['email'], [email], ['password', 'login', 'room'])];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        console.log("user.resurce 23 " + e_1.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserResurce.prototype.emailIsExist = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Storage.getItemWithConditionally(this.model, ["email"], [email])];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.length === 0 ? false : true];
                }
            });
        });
    };
    /// получаем пользователей по chat IF 
    UserResurce.prototype.createUser = function (email, login, password, room) {
        return __awaiter(this, void 0, void 0, function () {
            var user, nRoom;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new User({ email: email, login: login, password: password })];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        if (!(room === undefined)) return [3 /*break*/, 5];
                        nRoom = new Room({ users: user._id });
                        return [4 /*yield*/, nRoom.save()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.Storage.setItem(User, { _id: user._id }, 'room', nRoom._id)];
                    case 4:
                        _a.sent();
                        room = nRoom._id;
                        return [3 /*break*/, 8];
                    case 5: return [4 /*yield*/, this.Storage.setItem(User, { _id: user._id }, 'room', room)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.Storage.pushItem(Room, { _id: room }, 'users', user._id)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [2 /*return*/, { login: login, room: room }];
                }
            });
        });
    };
    UserResurce.prototype.addChatId = function (email, chat) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("here we go");
                        return [4 /*yield*/, this.Storage.setItem(this.model, { email: email }, "chatId", chat)];
                    case 1: 
                    //await   this.Storage.setItem(User, { _id: user._id }, 'room', nRoom._id)
                    return [2 /*return*/, (_a.sent()) ? true : false];
                }
            });
        });
    };
    return UserResurce;
}());
exports.UserResurce = UserResurce;
exports.userResurce = new UserResurce(User, Room, Storage_1.Storage);
