"use strict";
exports.__esModule = true;
exports.TaskList = void 0;
var moment = require("moment");
var dateHandlers_1 = require("../handlers/dateHandlers");
var TaskList = /** @class */ (function () {
    function TaskList(tasks, mode, date) {
        var _this = this;
        this.getTasksForCurrentDay = function (tasks, dateArg) {
            var dayTasks = [];
            tasks.forEach(function (e) {
                var taskDate = moment(e.date);
                if (dateHandlers_1.compareDate(taskDate, dateArg, ['equal', 'equal', 'equal'], ['date', 'month', 'year'], "and") || _this.taskInRange(e.period, taskDate, dateArg))
                    dayTasks.push(e);
            });
            return dayTasks;
        };
        this.getTasksForCurrentMonth = function (tasks, dateArg) {
            var date = moment(dateArg);
            var length = dateHandlers_1.getNumberOfDays(dateArg);
            var monthTasks = [];
            var _loop_1 = function (i) {
                tasks.forEach(function (e) {
                    var taskDate = moment(e.date);
                    date.date(i + 1);
                    if (dateHandlers_1.compareDate(taskDate, date, ['equal', 'equal', 'equal'], ['date', 'month', 'year'], "and") || (_this.taskInRange(e.period, taskDate, date))) {
                        if (monthTasks[i] == undefined)
                            monthTasks[i] = [];
                        monthTasks[i].push(e);
                    }
                });
            };
            for (var i = 0; i < length; i++) {
                _loop_1(i);
            }
            return monthTasks;
        };
        this.getTasksForCurrentWeek = function (tasks, dateArg) {
            var monthTasks = [];
            var range = dateHandlers_1.getWeekRange(dateArg);
            var i = range.first;
            var j = 0;
            while (dateHandlers_1.compareDate(i, range.last, ['lEqual'], ['full'])) {
                tasks.forEach(function (e) {
                    if (dateHandlers_1.compareDate(e.date, i, ['equal', 'equal', 'equal'], ['date', 'month', 'year'], "and") || _this.taskInRange(e.period, moment(e.date), moment(i))) {
                        if (monthTasks[j] == undefined)
                            monthTasks[j] = [];
                        monthTasks[j].push(e);
                    }
                });
                i.add(1, 'd');
                j++;
            }
            return monthTasks;
        };
        this.taskInRange = function (period, fDate, secDate) {
            var date = moment(fDate);
            switch (period) {
                case "day":
                    return dateHandlers_1.compareDate(date, secDate, ['lEqual'], ['full']);
                case "week":
                    while (1) {
                        if (dateHandlers_1.compareDate(date, secDate, ['equal', 'more'], ["year", "month"], "and") || dateHandlers_1.compareDate(date, secDate, ['more'], ["year"], "and"))
                            return false;
                        if (dateHandlers_1.compareDate(date, secDate, ['equal', 'equal', 'equal'], ['date', 'month', 'year'], 'and'))
                            return true;
                        date.add(7, 'd');
                    }
                /*
                 while (1) {
                if (((date.year() === secDate.year() && date.month() > secDate.month()) || ((date.year() > secDate.year()))))
                  
                if (datesAreEqual(date, secDate))
                    return true;
                date.add(7, 'd');
            }
                
                */
                case "month":
                    if (dateHandlers_1.compareDate(date, secDate, ['equal'], ['date'], 'and') || (secDate.date() === dateHandlers_1.getNumberOfDays(secDate) && dateHandlers_1.compareDate(date, secDate, ['more'], ['date'], 'and')))
                        return true;
                    return false;
                case "year":
                    if (dateHandlers_1.compareDate(date, secDate, ['equal', 'equal'], ['date', 'month'], 'and') || (secDate.date() === dateHandlers_1.getNumberOfDays(secDate) && dateHandlers_1.compareDate(date, secDate, ['more'], ['date'], 'and')))
                        return true;
                    return false;
                default:
                    return false;
            }
        };
        this.tasks = this.filterTasksByMode(tasks, mode, date);
    }
    TaskList.prototype.getTasks = function () {
        return this.tasks;
    };
    TaskList.prototype.filterTasksByMode = function (tasks, mode, date) {
        switch (mode) {
            case "CALENDAR":
                return this.getTasksForCurrentMonth(tasks, moment(date));
            case 'WEEKLIST':
                return this.getTasksForCurrentWeek(tasks, moment(date));
            case "taskList":
                return this.getTasksForCurrentDay(tasks, moment(date));
            default:
                return;
        }
    };
    return TaskList;
}());
exports.TaskList = TaskList;
