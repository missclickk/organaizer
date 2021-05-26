"use strict";
exports.__esModule = true;
exports.ObservableWrapper = void 0;
var ObservableWrapper = /** @class */ (function () {
    function ObservableWrapper() {
        this.observers = [];
    }
    ObservableWrapper.prototype.registrObserver = function (observer) {
        this.observers.push(observer);
    };
    ObservableWrapper.prototype.delteObserver = function (observer) {
        this.observers.splice(this.observers.indexOf(observer), 1);
    };
    ObservableWrapper.prototype.notifyObservers = function (args) {
        this.observers.forEach(function (e, i) {
            console.log("is : " + i);
            e.update(args);
        });
    };
    return ObservableWrapper;
}());
exports.ObservableWrapper = ObservableWrapper;
