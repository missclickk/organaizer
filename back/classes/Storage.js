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
exports.storage = exports.Storage = void 0;
var Mongoose = require("mongoose");
var Storage = /** @class */ (function () {
    function Storage(mDb) {
        this.MONGO_URI = "mongodb+srv://us:123@organizer.x9hju.mongodb.net/<dbname>?retryWrites=true&w=majority";
        this.database = mDb;
    }
    Storage.prototype.intitStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.database.connect(this.MONGO_URI, {
                                useNewUrlParser: true,
                                useUnifiedTopology: true,
                                useCreateIndex: true
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Storage.getItemWithOrConditionally = function (model, filds, fildsVal, fildsOr, fildsValOr, returnVals) {
        if (returnVals === void 0) { returnVals = []; }
        return __awaiter(this, void 0, void 0, function () {
            var conditions, conditionsOr, test, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        conditions = filds.map(function (e, i) {
                            var _a;
                            return _a = {}, _a[e] = fildsVal[i], _a;
                        });
                        conditionsOr = fildsOr.map(function (e, i) {
                            var _a;
                            return _a = {}, _a[e] = fildsValOr[i], _a;
                        });
                        return [4 /*yield*/, model.find({}, returnVals.reduce(function (a, val) { return a + ' ' + val; }, " ")).or([{ $and: conditions }, { $and: conditionsOr }])];
                    case 1:
                        test = _a.sent();
                        return [2 /*return*/, test];
                    case 2:
                        e_2 = _a.sent();
                        console.log(e_2);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Storage.getItemWithConditionally = function (model, filds, fildsVal, returnVals) {
        if (returnVals === void 0) { returnVals = []; }
        return __awaiter(this, void 0, void 0, function () {
            var conditions, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        conditions = filds.map(function (e, i) {
                            var _a;
                            return _a = {}, _a[e] = fildsVal[i], _a;
                        });
                        return [4 /*yield*/, model.find({}, returnVals.reduce(function (a, val) { return a + ' ' + val; }, " ")).and(conditions)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_3 = _a.sent();
                        console.log(e_3);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Storage.getAllItems = function (model, returnVals) {
        if (returnVals === void 0) { returnVals = []; }
        return __awaiter(this, void 0, void 0, function () {
            var e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, model.find({}, returnVals.reduce(function (a, val) { return a + ' ' + val; }, " "))];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_4 = _a.sent();
                        console.log(e_4);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Storage.getItemByID = function (model, id, returnVals) {
        if (returnVals === void 0) { returnVals = null; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        if (!(returnVals === null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, model.findById(id)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, model.findById(id, returnVals.reduce(function (a, val) { return a + ' ' + val; }, " ")).exec()];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/, _a];
                    case 5:
                        e_5 = _b.sent();
                        console.log(e_5);
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Storage.addItem = function (model, item, returnObj) {
        if (returnObj === void 0) { returnObj = false; }
        return __awaiter(this, void 0, void 0, function () {
            var obj, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        obj = new model(__assign({}, item));
                        return [4 /*yield*/, obj.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, returnObj ? obj : true];
                    case 2:
                        e_6 = _a.sent();
                        console.log(e_6);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Storage.pushItem = function (model, query, param, val) {
        return __awaiter(this, void 0, void 0, function () {
            var updateDocument, e_7;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        updateDocument = { $push: (_a = {}, _a[param] = val, _a) };
                        return [4 /*yield*/, model.updateOne(query, updateDocument)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 2:
                        e_7 = _b.sent();
                        console.log(e_7);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Storage.deleteItem = function (model, query, value) {
        return __awaiter(this, void 0, void 0, function () {
            var e_8;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, model.deleteOne((_a = {}, _a[query] = value, _a))];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 2:
                        e_8 = _b.sent();
                        console.log(e_8);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Storage.setItem = function (model, query, param, val) {
        return __awaiter(this, void 0, void 0, function () {
            var updateDocument, e_9;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        updateDocument = { $set: (_a = {}, _a[param] = val, _a) };
                        return [4 /*yield*/, model.updateOne(query, updateDocument)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 2:
                        e_9 = _b.sent();
                        console.log(e_9);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Storage.getIncludesItems = function (model, valName, val, returnVals) {
        if (returnVals === void 0) { returnVals = []; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_10;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, , 6]);
                        if (!(returnVals.length === 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, model.find((_b = {}, _b[valName] = { $in: val }, _b))];
                    case 1:
                        _a = _d.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, model.find((_c = {}, _c[valName] = { $in: val }, _c), returnVals.reduce(function (a, val) { return a + ' ' + val; }, " "))];
                    case 3:
                        _a = _d.sent();
                        _d.label = 4;
                    case 4: return [2 /*return*/, _a];
                    case 5:
                        e_10 = _d.sent();
                        console.log(e_10);
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return Storage;
}());
exports.Storage = Storage;
exports.storage = new Storage(Mongoose);
