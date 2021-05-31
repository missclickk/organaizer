"use strict";
exports.__esModule = true;
exports.RegCommand = void 0;
var RegCommand = /** @class */ (function () {
    function RegCommand(args, chatId, executor) {
        args = args.filter(function (e) { return e != ""; });
        this.email = args[0];
        this.password = args[1];
        this.executor = executor;
        this.chatId = chatId;
    }
    RegCommand.prototype.execute = function () {
        this.executor(this.email, this.password, this.chatId);
    };
    return RegCommand;
}());
exports.RegCommand = RegCommand;
