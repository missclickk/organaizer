import moment from 'moment'        
import { CREATE_TASK, CLEAR_ERROR_LIST, IS_TASK_WIN, CHANGE_DATE, IS_EXISTING_TASK, IS_TASK_LIST, CHANGE_CALENDAR } from './types'
import { formatTask,   getTasksForCurrentMonth,getTasksForCurrentWeek } from '../functions/tasksHandlers'
import { changeMonthWithFlag, changeWeekWithFlag} from './../functions/dateHandlers'
const emptyArrM = new Array(31).fill([]);
const emptyArrW = new Array(7).fill([]);
const initialState = {
    tasks: [],
    currentMonthTasks: emptyArrM,
    currentWeekTasks: emptyArrW,
    renderTasks: [],
    renderOneTask: {},
    errorList: [],
    closeWin: false,
    date: moment()
}

const findByHash=(hash,arr)=>{
    let buf;
        arr.forEach((e,i)=>{
            if(e.title===hash)
            buf= e;
        })
return buf;
}


export const taskReducer = (state = initialState, action) => {

    
    switch (action.type) {

        case CREATE_TASK:
            const errorList = []//getErrorList(action.payload);
            const tasks = [...state.tasks, formatTask(action.payload)];
         
            return errorList.length === 0 ?
                {
                    ...state,
                    tasks: tasks,
                    errorList: [],
                    closeWin: true,
                    currentMonthTasks :  getTasksForCurrentMonth(tasks, state.date),
                    currentWeekTasks :    getTasksForCurrentWeek(tasks, state.date)
                } :

                {
                    ...state,
                    errorList: errorList,
                    closeWin: false
                }
            
        case CLEAR_ERROR_LIST:
            return { ...state, errorList: [] }

        case IS_TASK_WIN:
            return { ...state, closeWin: false, renderOneTask:{} }

        case IS_TASK_LIST:
            const rTasks = action.payload == -1 ? [] : state.currentMonthTasks[Math.floor(action.payload)]

            return { ...state, closeWin: false, renderTask: rTasks }

        case CHANGE_DATE:
            const date = action.mode=="CALENDAR"? changeMonthWithFlag(action.payload, state.date): changeWeekWithFlag(action.payload, state.date);
            return { ...state, date: date, currentMonthTasks: getTasksForCurrentMonth(state.tasks,date),currentWeekTasks:getTasksForCurrentWeek(state.tasks,date) }

        case IS_EXISTING_TASK:
            return { ...state,renderOneTask:findByHash(action.payload,state.tasks) }
            default:
            return state;
    }

}