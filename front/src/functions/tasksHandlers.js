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

let breakKey = 0;
const quickSort = (arr, supprotElemHour = 12, supprotElemMin = 0) => {
    breakKey++;
  
    if (breakKey === 100)
        return arr;

    if (arr.length <= 1) return arr;
    let leftArr = [];
    let rightArr = [];

    arr.forEach(e => {
        if (e.length !== 0) {
            const buf = e.time.split(':');
            if ((buf[0] === supprotElemHour && buf[1] > supprotElemMin) || buf[0] > supprotElemHour)
                rightArr.push(e);
            else {
                leftArr.push(e);
            }
        }
    });
    let timeR = [];
    let timeL = [];
    if (leftArr.length === 0) {
        timeR = rightArr[Math.floor(rightArr.length / 2 - 1)].time.split(':')
        return quickSort(rightArr, timeR[0], timeR[1])
    }
    if (rightArr.length == 0) {
        timeL = leftArr[Math.floor(leftArr.length / 2 - 1)].time.split(':')
        return quickSort(leftArr, timeL[0], timeL[1]);
    }

    timeL = leftArr[Math.floor(leftArr.length / 2)].time.split(':')
    timeR = rightArr[Math.floor(rightArr.length / 2)].time.split(':')

    return quickSort(leftArr, timeL[0], timeL[1]).concat(quickSort(rightArr, timeR[0], timeR[1]))
}

export const sortByTime = (arr) => {
  
    breakKey = 0;
    return quickSort(arr);
}
const sortTasksForAllDays = (tasks) => {

    tasks.forEach(e => {
        if (e.length != 0)
            e = sortByTime(e);
    })

    return tasks;
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
   // console.log(sortTasksForAllDays(currentTasks));
    return currentTasks;
}

export const getTasksForCurrentMonth = (tasks, buf) => {
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
    return currentTasks;
}


