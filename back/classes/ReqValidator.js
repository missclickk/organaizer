"use strict";
exports.__esModule = true;
exports.reqValidator = exports.ReqValidator = void 0;
var moment = require("moment");
var ErrorCod;
(function (ErrorCod) {
    ErrorCod[ErrorCod["WRONG_DATA"] = 1] = "WRONG_DATA";
    ErrorCod[ErrorCod["SMALL_LOGIN"] = 2] = "SMALL_LOGIN";
    ErrorCod[ErrorCod["SMALL_PASSWORD"] = 3] = "SMALL_PASSWORD";
    ErrorCod[ErrorCod["PASSWORD_MISMATCH"] = 4] = "PASSWORD_MISMATCH";
    ErrorCod[ErrorCod["WRONG_EMAIL"] = 5] = "WRONG_EMAIL";
    ErrorCod[ErrorCod["WRONG_TITLE"] = 6] = "WRONG_TITLE";
    ErrorCod[ErrorCod["WRONG_DATE"] = 7] = "WRONG_DATE";
    ErrorCod[ErrorCod["WRONG_TIME"] = 8] = "WRONG_TIME";
    ErrorCod[ErrorCod["WRONG_USERS"] = 9] = "WRONG_USERS";
    ErrorCod[ErrorCod["WRONG_DATA_OVERFLOW"] = 10] = "WRONG_DATA_OVERFLOW";
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
            },
            title: function (val) {
                console.log(val);
                return val.length >= 1 ? VALIDATION_SUCCESSFUL : ErrorCod.WRONG_TITLE;
            },
            date: function (val) {
                if (val.length == 0)
                    return ErrorCod.WRONG_DATE;
                var currentDate = moment().valueOf();
                var compareDate = moment(val).hour(moment().hour() + 1).valueOf();
                return currentDate <= compareDate ? VALIDATION_SUCCESSFUL : ErrorCod.WRONG_DATE;
            },
            time: function (val) {
                return val.length == 0 ? ErrorCod.WRONG_TIME : VALIDATION_SUCCESSFUL;
            },
            users: function (val) {
                for (var user in val)
                    if (val[user] === true)
                        return VALIDATION_SUCCESSFUL;
                return ErrorCod.WRONG_USERS;
            }
        };
    }
    ReqValidator.prototype.validate = function (obj) {
        var result = [];
        for (var item in obj) {
            result.push(item === "rPassword" ? this.rules[item](obj.rPassword, obj.password) : this.rules[item](obj[item]));
        }
        console.log(result);
        return result;
    };
    return ReqValidator;
}());
exports.ReqValidator = ReqValidator;
exports.reqValidator = new ReqValidator();
