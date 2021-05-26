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
exports.SendKeyBoardCommand = void 0;
var t_bot_1 = require("../t_bot");
var KEYBOARD_TYPE;
(function (KEYBOARD_TYPE) {
    KEYBOARD_TYPE[KEYBOARD_TYPE["USERS"] = 0] = "USERS";
})(KEYBOARD_TYPE || (KEYBOARD_TYPE = {}));
var SendKeyBoardCommand = /** @class */ (function () {
    function SendKeyBoardCommand(args, chatId, resurce, wrapper) {
        this.chatId = chatId;
        ;
        this.args = args;
        this.resurce = resurce;
        this.wrapper = wrapper;
    }
    SendKeyBoardCommand.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users, keyboard, room;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resurce.getListByChatId(this.chatId)];
                    case 1:
                        users = _a.sent();
                        keyboard = users.map(function (e) { return [e.login]; });
                        keyboard.push(["далее"]);
                        keyboard.push(["отмена"]);
                        if (KEYBOARD_TYPE.USERS === 0)
                            t_bot_1.tbot.sendKeyboard(this.chatId, "ВЫберете пользователей котоым будет виден этот список", keyboard);
                        return [4 /*yield*/, this.resurce.getUserByChatId(this.chatId)];
                    case 2:
                        room = (_a.sent()).room;
                        return [2 /*return*/, this.wrapper.bind(null, this.args.join(" "), room, users.map(function (e) { return e.login; }))];
                }
            });
        });
    };
    return SendKeyBoardCommand;
}());
exports.SendKeyBoardCommand = SendKeyBoardCommand;
