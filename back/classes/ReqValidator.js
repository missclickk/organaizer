"use strict";
exports.__esModule = true;
exports.reqValidator = exports.ReqValidator = void 0;
var ErrorCod;
(function (ErrorCod) {
    ErrorCod[ErrorCod["SMALL_LOGIN"] = 1] = "SMALL_LOGIN";
    ErrorCod[ErrorCod["SMALL_PASSWORD"] = 2] = "SMALL_PASSWORD";
    ErrorCod[ErrorCod["PASSWORD_MISMATCH"] = 3] = "PASSWORD_MISMATCH";
    ErrorCod[ErrorCod["WRONG_EMAIL"] = 4] = "WRONG_EMAIL";
})(ErrorCod || (ErrorCod = {}));
var VALIDATION_SUCCESSFUL = true;
var ReqValidator = /** @class */ (function () {
    function ReqValidator() {
        this.rules = {
            login: function (val) {
                if (val.length <= 0)
                    return ErrorCod.SMALL_LOGIN;
                else
                    return VALIDATION_SUCCESSFUL;
            },
            password: function (val) {
                if (val.length < 5)
                    return ErrorCod.SMALL_PASSWORD;
                else
                    return VALIDATION_SUCCESSFUL;
            },
            rPassword: function (val, val1) {
                if (val != val1)
                    return ErrorCod.PASSWORD_MISMATCH;
                else
                    return VALIDATION_SUCCESSFUL;
            },
            email: function (val) {
                var reg = new RegExp("\\w+@\\w+.\\w+", 'g');
                var result = val.match(reg);
                if (result !== null && result[0].length == val.length)
                    return VALIDATION_SUCCESSFUL;
                else
                    return ErrorCod.WRONG_EMAIL;
            }
        };
    }
    ReqValidator.prototype.validate = function (obj) {
        var result = [];
        for (var item in obj) {
            result.push(item === "rPassword" ? this.rules[item](obj.rPassword, obj.password) : this.rules[item](obj[item]));
        }
        return result;
    };
    return ReqValidator;
}());
exports.ReqValidator = ReqValidator;
exports.reqValidator = new ReqValidator();
