import moment from 'moment'
import { getNumberOfDays, getWeekRange } from './dateHandlers'
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
export const getErrorList = (task) => {
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

export const formatTask = (task) => {
    const [year, month, date] = task.date.split('-');
    const [hour, minute] = task.time.split(':');
    const dateMoment = moment(task.date);
    return { ...task, year: year, month: month, date: date, hour: hour, minute: minute, dateMoment: dateMoment };
}

const datesAreEqual = (date, secDate) => {
    return date.date() === secDate.date() && date.year() === secDate.year() && secDate.month() === date.month() ? true : false;
}
const firstDateAreGreater = (fD, sD) => {

    return (fD.date() > sD.date() && fD.month() === sD.month() && fD.year() === sD.year()) || (fD.month() > sD.month() && fD.year() === sD.year()) || (fD.year() > sD.year()) ? true : false;
}
const taskInRange = (period, fDate, secDate) => {
    let date = moment(fDate);
    switch (period) {
        case "never":
            return false;
        case "day":
            return !firstDateAreGreater(date, secDate) ? true : false;
        case "week":
            while (1) {
                if (((date.year() === secDate.year() && date.month() > secDate.month()) || ((date.year() > secDate.year()))))
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
            if (date.date() === secDate.date() && date.month() === secDate.month())
                return true;
            return false;

        default:
            return false;
    }


}



export const getTasksForCurrentWeek = (tasks, buf) => {
    let currentTasks = [];
    const range = getWeekRange(buf);

    let i = range.first;
    let j = 0;
    while (!firstDateAreGreater(i, range.last)) {
        currentTasks[j] = [];
        tasks.forEach(e => {
            if (datesAreEqual(e.dateMoment, i) || taskInRange(e.period, e.dateMoment, i)) {
                currentTasks[j].push(e);

            }
        })
        i.add(1, 'd');
        j++;
    }
  
    return currentTasks;
}

export const getTasksForCurrentMonth = (tasks, buf) => {
    console.log(tasks);
    let currentTasks = [];
    let date = moment(buf);
    const lenght = getNumberOfDays(date);
    for (let i = 0; i < lenght; i++) {
        currentTasks[i] = [];
        tasks.forEach(e => {
            if (!firstDateAreGreater(e.dateMoment, date.date(lenght))) {
                date.date(i + 1);
                e.dateMoment.date(e.date);
                if (datesAreEqual(e.dateMoment, date) || taskInRange(e.period, e.dateMoment, date)) {
                    currentTasks[i].push(e);
                }
            }
        })

    }
    console.log(currentTasks);
    return currentTasks;
}


/*
clone.date()>wRange.last.date() && clone.month()<wRange.last.month())
               ||(clone.date()<=wRange.last.date() &&  clone.month()<=wRange.last.month())
             */