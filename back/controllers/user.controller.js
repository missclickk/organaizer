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
exports.userController = exports.UserController = void 0;
var user_resurce_1 = require("./../resurce/user.resurce");
var ReqValidator_1 = require("./../classes/ReqValidator");
var bcrypt = require("bcryptjs");
var UserController = /** @class */ (function () {
    function UserController(userResurce, reqValidator, bcrypt) {
        this.resurce = userResurce;
        this.validator = reqValidator;
        this.bcrypt = bcrypt;
    }
    UserController.prototype.addBotLink = function (email, password, chatId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, resultAsError, user, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.getUser(email, password)];
                    case 1:
                        result = _a.sent();
                        resultAsError = result;
                        user = result;
                        if (!resultAsError.message) return [3 /*break*/, 2];
                        return [2 /*return*/, { message: resultAsError.message }];
                    case 2: return [4 /*yield*/, this.resurce.addChatId(email, chatId)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { message: "ok" }];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        console.log("user.controller 70 " + e_1.message);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getUserList = function (roomId) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resurce.getList(roomId)];
                    case 1:
                        users = _a.sent();
                        if (users.length !== 0)
                            return [2 /*return*/, users];
                        else
                            return [2 /*return*/, new Error("ошибка")];
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getUser = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (this.validator.validate({ email: email })[0] === 1)
                            throw new Error("неправильный email");
                        return [4 /*yield*/, this.resurce.getUser(email)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new Error("email не найден");
                        return [4 /*yield*/, this.bcrypt.compare(password, user[0].password)];
                    case 2:
                        if (_a.sent()) {
                            return [2 /*return*/, { login: user[0].login, room: user[0].room }];
                        }
                        else
                            throw new Error("email не найден");
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        console.log("//////////////////////////////////////////////   37");
                        return [2 /*return*/, e_2];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.createUser = function (email, reqlogin, password, rPassword, reqroom) {
        return __awaiter(this, void 0, void 0, function () {
            var validateResult, hashedPassword, _a, room, login, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.resurce.emailIsExist(email)];
                    case 1:
                        if (_b.sent())
                            throw new Error(JSON.stringify([1]));
                        validateResult = this.validator.validate({ email: email, login: reqlogin, password: password, rPassword: rPassword }).filter(function (e) { return e !== true; });
                        console.log("here");
                        console.log(validateResult);
                        if (validateResult.length > 0)
                            throw new Error(JSON.stringify(validateResult));
                        return [4 /*yield*/, this.bcrypt.hash(password, 12)];
                    case 2:
                        hashedPassword = _b.sent();
                        return [4 /*yield*/, this.resurce.createUser(email, reqlogin, hashedPassword, reqroom)];
                    case 3:
                        _a = _b.sent(), room = _a.room, login = _a.login;
                        return [2 /*return*/, { room: room, login: login, type: "data" }];
                    case 4:
                        e_3 = _b.sent();
                        console.log("user.controller 55 " + e_3);
                        return [2 /*return*/, { type: "error", message: [e_3.message] }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
exports.userController = new UserController(user_resurce_1.userResurce, new ReqValidator_1.ReqValidator(), bcrypt);
