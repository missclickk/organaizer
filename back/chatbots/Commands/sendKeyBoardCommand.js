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
exports.SendKeyBoardCommand = exports.KEYBOARD_TYPE = void 0;
var t_bot_1 = require("../t_bot");
var KEYBOARD_TYPE;
(function (KEYBOARD_TYPE) {
    KEYBOARD_TYPE[KEYBOARD_TYPE["ERROR"] = 1] = "ERROR";
    KEYBOARD_TYPE[KEYBOARD_TYPE["DEFAULT"] = 2] = "DEFAULT";
    KEYBOARD_TYPE[KEYBOARD_TYPE["USERS"] = 3] = "USERS";
    KEYBOARD_TYPE[KEYBOARD_TYPE["ERROR_OVERFLOW"] = 4] = "ERROR_OVERFLOW";
})(KEYBOARD_TYPE = exports.KEYBOARD_TYPE || (exports.KEYBOARD_TYPE = {}));
var SendKeyBoardCommand = /** @class */ (function () {
    function SendKeyBoardCommand(type, args, chatId, resurce, wrapper) {
        this.chatId = chatId;
        ;
        this.args = args;
        this.resurce = resurce;
        this.wrapper = wrapper;
        this.keyBoardType = type;
    }
    SendKeyBoardCommand.prototype.createUserKeyBoard = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users, keyboard, room;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resurce.getListByChatId(this.chatId)];
                    case 1:
                        users = _a.sent();
                        keyboard = users.map(function (e) { return [e.login]; });
                        return [4 /*yield*/, this.resurce.getUserByChatId(this.chatId)];
                    case 2:
                        room = (_a.sent()).room;
                        this.wrapper = this.wrapper.bind(null, room, this.args.join(" "), users.map(function (e) { return e.login; }));
                        return [2 /*return*/, keyboard];
                }
            });
        });
    };
    SendKeyBoardCommand.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var keyboard, disciprion, commandType, _a, users, room;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        keyboard = [];
                        _a = this.keyBoardType;
                        switch (_a) {
                            case KEYBOARD_TYPE.USERS: return [3 /*break*/, 1];
                            case KEYBOARD_TYPE.DEFAULT: return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 6];
                    case 1: return [4 /*yield*/, this.createUserKeyBoard()];
                    case 2:
                        keyboard = _b.sent();
                        disciprion = "Выберете пользователей котоым будет виден этот список";
                        commandType = "users";
                        keyboard.push(["далее"]);
                        return [3 /*break*/, 7];
                    case 3:
                        disciprion = "напишите описание события";
                        commandType = "disciprion";
                        return [4 /*yield*/, this.resurce.getListByChatId(this.chatId)];
                    case 4:
                        users = _b.sent();
                        return [4 /*yield*/, this.resurce.getUserByChatId(this.chatId)];
                    case 5:
                        room = (_b.sent()).room;
                        this.wrapper = this.wrapper.bind(null, room, this.args.join(" "), users.map(function (e) { return e.login; }));
                        _b.label = 6;
                    case 6: return [3 /*break*/, 7];
                    case 7:
                        keyboard.push(["отмена"]);
                        t_bot_1.tbot.sendKeyboard(this.chatId, disciprion, keyboard);
                        return [2 /*return*/, { wrapper: this.wrapper, commandType: commandType }];
                }
            });
        });
    };
    return SendKeyBoardCommand;
}());
exports.SendKeyBoardCommand = SendKeyBoardCommand;
