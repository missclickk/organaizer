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
            op = body.н
            call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.taskController = exports.TaskController = void 0;
var tasksHandler_1 = require("./../classes/tasksHandler");
var task_resurce_1 = require("./../resurce/task.resurce");
var ReqValidator_1 = require("./../classes/ReqValidator");
var TaskController = /** @class */ (function () {
    function TaskController(taskResurce, TasksList, validator) {
        this.taskResurce = taskResurce;
        this.tasksList = TasksList;
        this.validator = validator;
    }
    TaskController.prototype.getTaskList = function (mode, date, login, room) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = this.tasksList).bind;
                        return [4 /*yield*/, this.taskResurce.getTaskList(login, room)];
                    case 1: return [2 /*return*/, new (_b.apply(_a, [void 0, _c.sent(), mode, date]))().getTasks()];
                    case 2:
                        e_1 = _c.sent();
                        console.log(e_1);
                        return [2 /*return*/, e_1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TaskController.prototype.getTask = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.taskResurce.getTask(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_2 = _a.sent();
                        console.log(e_2);
                        return [2 /*return*/, e_2];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TaskController.prototype.deleteTask = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.taskResurce.deleteItem(id)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        console.log(e_3);
                        return [2 /*return*/, e_3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TaskController.prototype.addTask = function (task, room) {
        return __awaiter(this, void 0, void 0, function () {
            var obj, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        obj = { title: task.title, date: task.date, time: task.time, users: task.users };
                        result = this.validator.validate(obj);
                        result = result.filter(function (e) { return e !== true; });
                        if (!(result.length === 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.taskResurce.addItem(task, room)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2: throw new Error(JSON.stringify(result));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return TaskController;
}());
exports.TaskController = TaskController;
exports.taskController = new TaskController(task_resurce_1.taskResurce, tasksHandler_1.TaskList, ReqValidator_1.reqValidator);
