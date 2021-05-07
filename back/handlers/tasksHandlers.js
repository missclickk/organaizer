const moment = require('moment');
const { getNumberOfDays, getWeekRange, compareDate } = require('./dateHandlers');

class TaskList{
    #tasks;
    constructor(tasks,mode,date){
    this.#tasks=this.#filterTasksByMode(tasks,mode,date);
    }
    get tasks(){
        return this.#tasks;
    }


    #filterTasksByMode(tasks,mode,date){
        switch (mode) {
            case "CALENDAR":
                return this.#getTasksForCurrentMonth(tasks, moment(date));
            case 'WEEKLIST':
                return this.#getTasksForCurrentWeek(tasks, moment(date));
            case "taskList":
                return this.#getTasksForCurrentDay(tasks, moment(date));
            default:
                return;
    
        }
    }
    #getTasksForCurrentDay = (tasks, dateArg) => {
        const dayTasks = [];
        tasks.forEach(e => {
            const taskDate = moment(e.date);
            if (compareDate(taskDate, dateArg, ['equal', 'equal', 'equal'], ['date', 'month', 'year'], "and") || (compareDate(taskDate, dateArg, ['lEqual'], ['full']) && this.#taskInRange(e.period, taskDate, dateArg)))
                dayTasks.push(e);
    
        })
        return dayTasks;
    }
    #getTasksForCurrentMonth = (tasks, dateArg) => {

        let date = moment(dateArg);
        const length = getNumberOfDays(dateArg);
        const monthTasks = [];
        for (let i = 0; i < length; i++) {
            tasks.forEach(e => {
                const taskDate = moment(e.date);
                date.date(i + 1);
                if (compareDate(taskDate, date, ['equal', 'equal', 'equal'], ['date', 'month', 'year'], "and") || (compareDate(taskDate, date.date(length), ['lEqual'], ['full']) && this.#taskInRange(e.period, taskDate, date))) {
                    if (monthTasks[i] == undefined)
                        monthTasks[i] = [];
                        monthTasks[i].push(e);
    
                }
            })
        }
        return monthTasks;
    }
    #getTasksForCurrentWeek = (tasks, dateArg) => {

        const monthTasks = [];
        const range = getWeekRange(dateArg);
        let i = range.first;
        let j = 0;
        while (compareDate(i, range.last, ['lEqual'], ['full'])) {
            tasks.forEach(e => {
                if (compareDate(e.date, i, ['equal', 'equal', 'equal'], ['date', 'month', 'year'], "and") || this.#taskInRange(e.period, moment(e.date), moment(i))) {
                    if (monthTasks[j] == undefined)
                    monthTasks[j] = [];
                    monthTasks[j].push(e);
                }
            })
            i.add(1, 'd');
            j++;
        }
    
        return  monthTasks;
    }
    #taskInRange = (period, fDate, secDate) => {
        let date = moment(fDate);
        switch (period) {
            case "day":
                return compareDate(date, secDate, ['lEqual'], ['full'])
            case "week":
                while (1) {
                    return false;
                }
            case "month":
                if (compareDate(date, secDate, ['equal'], ['date'],'and') || (secDate.date() === getNumberOfDays(secDate) &&compareDate(date, secDate, ['more'], ['date'],'and')))
                    return true;
                return false;
    
            case "year":
                if (compareDate(date, secDate, ['equal','equal'], ['date','month'],'and') || (secDate.date() === getNumberOfDays(secDate) &&compareDate(date, secDate, ['more'], ['date'],'and')))
                    return true;
                return false;
    
            default:
                return false;
        }
    }
}

module.exports = {TaskList};