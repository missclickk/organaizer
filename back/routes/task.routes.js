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
exports.taskRouter = exports.TaskRoutes = void 0;
var express_1 = require("express");
var task_controller_1 = require("./../controllers/task.controller");
var TaskRoutes = /** @class */ (function () {
    function TaskRoutes(router, taskController) {
        this.router = router;
        this.taskController = taskController;
        this.setupRouter();
    }
    TaskRoutes.prototype.setupRouter = function () {
        var _this = this;
        this.router.post('/one', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, task, room, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, task = _a.task, room = _a.room;
                        return [4 /*yield*/, this.taskController.addTask(task, room)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, res.status(200).json({ msg: ['created!!'] })];
                    case 2:
                        e_1 = _b.sent();
                        return [2 /*return*/, res.status(400).json({ msg: JSON.parse(e_1.message) })];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.router.get('/one', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.taskController.getTask(req.headers.id)
                            .then(function (task) { return res.status(200).json(task); })["catch"](function () { return res.status(404).json({ msg: ["wrong data"] }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
        this.router.get('/list', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, room, login, mode, _date;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.headers, room = _a.room, login = _a.login, mode = _a.mode, _date = _a._date;
                        return [4 /*yield*/, this.taskController.getTaskList(mode, _date, login, room)
                                .then(function (tasks) { return res.status(200).json({ tasks: tasks }); })["catch"](function (e) { return res.status(400).json({ msg: 'ошибка в запросе!' }); })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        }); });
        this.router["delete"]('/one', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.taskController.deleteTask(req.headers.target)];
                    case 1:
                        _a.sent();
                        res.status(200).json({ msg: ["sucsses"] });
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        console.log(e_2);
                        res.status(400).json({ msg: ["error with deleting"] });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    TaskRoutes.prototype.getRouter = function () {
        return this.router;
    };
    return TaskRoutes;
}());
exports.TaskRoutes = TaskRoutes;
exports.taskRouter = new TaskRoutes(express_1.Router(), task_controller_1.taskController).getRouter();
