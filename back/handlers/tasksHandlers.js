const moment = require('moment');
const Task = require('../models/Task');
const { getNumberOfDays, getWeekRange, compareDate } = require('./dateHandlers');
const { getItemWithOrConditionally } = require('./dbRequetHandler');

const taskInRange = (period, fDate, secDate) => {
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

const getTasksForCurrentWeek = (tasks, dateArg) => {

    const monthTasks = [];
    const range = getWeekRange(dateArg);
    let i = range.first;
    let j = 0;
    while (compareDate(i, range.last, ['lEqual'], ['full'])) {
        tasks.forEach(e => {
            if (compareDate(e.date, i, ['equal', 'equal', 'equal'], ['date', 'month', 'year'], "and") || taskInRange(e.period, moment(e.date), moment(i))) {
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

///update algo
const getTasksForCurrentMonth = (tasks, dateArg) => {

    let date = moment(dateArg);
    const length = getNumberOfDays(dateArg);
    const monthTasks = [];
    for (let i = 0; i < length; i++) {
        tasks.forEach(e => {
            const taskDate = moment(e.date);
            date.date(i + 1);
            if (compareDate(taskDate, date, ['equal', 'equal', 'equal'], ['date', 'month', 'year'], "and") || (compareDate(taskDate, date.date(length), ['lEqual'], ['full']) && taskInRange(e.period, taskDate, date))) {
                if (monthTasks[i] == undefined)
                    monthTasks[i] = [];
                    monthTasks[i].push(e);

            }
        })
    }
    return monthTasks;
}


const getTasksForCurrentDay = (tasks, dateArg) => {
    const dayTasks = [];
    tasks.forEach(e => {
        const taskDate = moment(e.date);
        if (compareDate(taskDate, dateArg, ['equal', 'equal', 'equal'], ['date', 'month', 'year'], "and") || (compareDate(taskDate, dateArg, ['lEqual'], ['full']) && taskInRange(e.period, taskDate, dateArg)))
            dayTasks.push(e);

    })
    return dayTasks;
}


const getTasksFromStorage = async (login, room) => {
    const filds = [`users.${login}`, 'room'];
    const fildsVal = [{ '$exists': false }, room];
    const filds1 = [`users.${login}`, 'room'];
    const fildsVal1 = [true, room];
    return await getItemWithOrConditionally(Task, filds, fildsVal, filds1, fildsVal1, ["_id", 'title', 'description', 'date', 'time', 'period']);
}
const filterTasksByMode = (mode, tasks, date) => {
    switch (mode) {
        case "CALENDAR":
            return getTasksForCurrentMonth(tasks, moment(date));
        case 'WEEKLIST':
            return getTasksForCurrentWeek(tasks, moment(date));
        case "taskList":
            return getTasksForCurrentDay(tasks, moment(date));
        default:
            return;

    }
}

const getTasks = async (mode, date, login, room) => {
    const allTasks = await getTasksFromStorage(login, room);
    return filterTasksByMode(mode, allTasks, date);
}
module.exports = { getTasks};