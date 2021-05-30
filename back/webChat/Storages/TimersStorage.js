"use strict";
exports.__esModule = true;
exports.timersStorage = exports.TimersStorage = void 0;
var TimersStorage = /** @class */ (function () {
    function TimersStorage() {
        this.timerList = new Map();
    }
    TimersStorage.prototype.deleteItemByName = function (key) {
        clearTimeout(this.getItemByName(key));
        return this.timerList["delete"](key);
    };
    TimersStorage.prototype.setItemByName = function (key, value) {
        this.timerList.set(key, value);
    };
    TimersStorage.prototype.getItemByName = function (key) {
        return this.timerList.get(key);
    };
    return TimersStorage;
}());
exports.TimersStorage = TimersStorage;
exports.timersStorage = new TimersStorage();
