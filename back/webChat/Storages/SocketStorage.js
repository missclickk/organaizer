"use strict";
exports.__esModule = true;
exports.SocketStorage = void 0;
var SocketStorage = /** @class */ (function () {
    function SocketStorage() {
        this.store = new Map();
    }
    SocketStorage.prototype.setItemByName = function (key, value) {
        this.store.set(key, value);
        return this.store.get(key);
    };
    SocketStorage.prototype.deleteItemByName = function (key) {
        return this.store["delete"](key);
    };
    ;
    SocketStorage.prototype.getItemByName = function (key) {
        if (this.store.has(key))
            return this.store.get(key);
        return false;
    };
    return SocketStorage;
}());
exports.SocketStorage = SocketStorage;
