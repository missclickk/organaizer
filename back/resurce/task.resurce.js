"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.taskResurce = exports.TaskResurce = void 0;
var Task = require("./../models/Task");
var Room = require("./../models/Room");
var Storage_1 = require("./../classes/Storage");
var TaskResurce = /** @class */ (function () {
    function TaskResurce(model, roomModel) {
        this.model = model;
        this.roomModel = roomModel;
    }
    TaskResurce.prototype.getTaskList = function (login, room) {
        return __awaiter(this, void 0, void 0, function () {
            var filds, fildsVal, filds1, fildsVal1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filds = ["users." + login, 'room'];
                        fildsVal = [{ '$exists': false }, room];
                        filds1 = ["users." + login, 'room'];
                        fildsVal1 = [true, room];
                        return [4 /*yield*/, Storage_1.Storage.getItemWithOrConditionally(this.model, filds, fildsVal, filds1, fildsVal1, ["_id", 'title', 'description', 'date', 'time', 'period'])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TaskResurce.prototype.getTask = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var task, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Storage_1.Storage.getItemByID(Task, id, ['_id', 'title', 'time', 'period', 'description'])];
                    case 1:
                        task = _a.sent();
                        if (!task)
                            throw "task not faund";
                        else
                            return [2 /*return*/, task];
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [2 /*return*/, e_1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TaskResurce.prototype.deleteItem = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Storage_1.Storage.deleteItem(Task, "_id", id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskResurce.prototype.addItem = function (task, room) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Storage_1.Storage.addItem(Task, __assign(__assign({}, task), { room: room }))];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        console.log(e_2);
                        return [2 /*return*/, e_2];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return TaskResurce;
}());
exports.TaskResurce = TaskResurce;
;
exports.taskResurce = new TaskResurce(Task, Room);
