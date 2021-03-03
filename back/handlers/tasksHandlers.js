const moment = require('moment');
const Task = require('../models/Task');
const { getNumberOfDays, getWeekRange } = require('./dateHandlers');
const { getItemWithOrConditionally } = require('./dbRequetHandler');
const empty = () => {
};



const checkEmptyString = (str) => {
    if (str === "")
        return false;
    else
        return true;
}
const checkDate = dateString => dateString >= moment().format().split(/T/)[0];
const checkTime = timeString => timeString >= moment().format().match(/(?:T)[0-9]*:[0-9]*:[0-9]*/)[0].replace(/T/, "");
const checkUserSelected = (task) => {
    let users = 0;
    for (let property in task)
        task[property] === true ? users++ : empty();
    if (!users)
        return false;
    return true;
}
const getErrorList = (task) => {
    let errorList = [];
    if (!checkEmptyString(task['title']))
        errorList.push("ПУСТОЕ НАЗВАНИЕ");
    if (!checkDate(task['date']))
        errorList.push("НЕКОРЕКТНАЯ ДАТА");
    else if (!checkTime(task['time']))
        errorList.push("НЕКОРЕКТНОЕ ВРЕМЯ");
    if (!checkUserSelected(task))
        errorList.push("НЕ ВЫБРАНЫ ПОЛЬЗОВАТЕЛИ");
    return errorList;
}
const formatTask = (task) => {
    const [year, month, date] = task.date.split('-');
    const [hour, minute] = task.time.split(':');
    const dateMoment = moment(task.date);
    return { ...task, year: year, month: month, date: date, hour: hour, minute: minute, dateMoment: dateMoment };
}

const datesAreEqual = (date, secDate) => date.valueOf() === moment([secDate.year(), secDate.month(), secDate.date()]).valueOf();



const firstDateAreGreater = (date, secDate) => moment([date.year(), date.month(), date.date()]).valueOf() > moment([secDate.year(), secDate.month(), secDate.date()]).valueOf();
const taskInRange = (period, fDate, secDate) => {
    let date = moment(fDate);
    switch (period) {
        case "never":
            return false;
        case "day":
            return !firstDateAreGreater(date, secDate) ? true : false;
        case "week":
            while (1) {
                if (firstDateAreGreater(date, secDate))
                    return false;
                if (datesAreEqual(date, secDate))
                    return true;
                date.add(7, 'd');
            }
        case "month":
            if (secDate.date() === date.date() || (secDate.date() === getNumberOfDays(secDate) && secDate.date() < date.date()))
                return true;
            return false;

        case "year":
            if ((date.date() === secDate.date() && date.month() === secDate.month()) || (secDate.date() === getNumberOfDays(secDate) && secDate.date() < date.date()))
                return true;
            return false;

        default:
            return false;
    }


}

const getTasksForCurrentWeek = (tasks, dateArg) => {

    let currentTasks = [];
    const range = getWeekRange(dateArg);
    let i = range.first;
    let j = 0;
    while (!firstDateAreGreater(i, range.last)) {
        let buf = [];
        tasks.forEach(e => {
            if (datesAreEqual(moment(e.date), moment(i)) || taskInRange(e.period, moment(e.date), moment(i))) {
                buf.push(e);
            }
        })

        if (buf.length != 0)
            currentTasks[j] = buf;
        i.add(1, 'd');
        j++;
    }

    return currentTasks;
}

///update algo
const getTasksForCurrentMonth = (tasks, dateArg) => {

    let date = moment(dateArg);
    const length = getNumberOfDays(dateArg);

    let currentTasks = [];
    for (let i = 0; i < length; i++) {
        let bufArr = [];
        tasks.forEach(e => {
            const dateMoment = moment(e.date);
            if (!firstDateAreGreater(dateMoment, date.date(length))) {
                date.date(i + 1);
                dateMoment.date(e.date);
                if (datesAreEqual(dateMoment, date) || taskInRange(e.period, dateMoment, date)) {
                    bufArr.push(e);
                }
            }
        })
        if (bufArr.length != 0)
            currentTasks[i] = bufArr;

    }
    return currentTasks;
}


const getTasksForCurrentDay = (tasks, dateArg) => {
    let bufArr = [];
    tasks.forEach(e => {
        const dateMoment = moment(e.date);
        if (!firstDateAreGreater(dateMoment, moment(dateArg))) {
            dateMoment.date(e.date);
            if (datesAreEqual(dateMoment, moment(dateArg)) || taskInRange(e.period, dateMoment, moment(dateArg))) {
                bufArr.push(e);
            }
        }
    })
    return bufArr;
}


const getTasksFromStorage = async (login, room) => {
    const filds=[`users.${login}`,'room'];
    const fildsVal=[{ '$exists' : false },room];
    const filds1=[`users.${login}`,'room'];
    const fildsVal1=[ true,room];
    return await getItemWithOrConditionally(Task, filds, fildsVal,filds1,fildsVal1 ,["_id", 'title', 'description', 'date', 'time', 'period']);
}
const getTasksByMode = (mode, tasks, date) => {
    switch (mode) {
        case "CALENDAR":
          return  getTasksForCurrentMonth(tasks,moment(date));
        case 'WEEKLIST':
           return getTasksForCurrentWeek(tasks,moment(date));
        case "taskList":
          return  getTasksForCurrentDay(tasks,moment(date));
        default:
        return;
      
    }
}

const getTasks = async (mode, date, login, room) => {
    const allTasks = await getTasksFromStorage(login, room);
    return getTasksByMode(mode,allTasks,date);
}
module.exports = { getTasks, getErrorList, formatTask };