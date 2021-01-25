import {CHANGE_DATE,ADD_MESSAGE,CHANGE_CALENDAR,IS_TASK_WIN,CREATE_TASK,CLEAR_ERROR_LIST,IS_EXISTING_TASK,IS_TASK_LIST} from "./types"
export function changeDate(flag,mode){
    return{ 
            type:CHANGE_DATE,
            mode:mode,
            payload:flag,
    }
}


export function addMessage(value){
    return{
        type:ADD_MESSAGE,
        payload:value
    }
}

export function changeCalendarMode(value){
    return{
        type: CHANGE_CALENDAR,
        payload:value
    }
}

export function WinTask(value){
    return{
        type: IS_TASK_WIN,
        payload:value
    }
}
export function TaskList(value=-1,flag){
    return{
        type: IS_TASK_LIST,
        payload:Math.floor(value),
        flag:flag
    }
}

export function TaskWinMutate(hash,flag){
   
    return{
     type: IS_EXISTING_TASK,
     payload: hash,
     flag:flag
 }
}


export function createTask(task,mode){
    return{
     type: CREATE_TASK,
     payload: task,
     mode:mode
     
 }
}


export function clearErrorList(){
   
    return{
    type:CLEAR_ERROR_LIST    
    }
}