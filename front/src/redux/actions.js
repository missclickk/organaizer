import {SWITCH_USER_WIN ,IS_LOGIN,TODO_ITEM_IS_CHANGED,GET_TODO_HASH,CREATE_TODO_TASK,CHANGE_MAIN_BLOCK,CHANGE_DATE,ADD_MESSAGE,IS_TASK_WIN,CREATE_TASK,CLEAR_ERROR_LIST,IS_EXISTING_TASK,IS_TASK_LIST, CREATE_TODO_LIST,TODO_BUTTONS,DEL_TODO_CARD} from "./types"
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

export function changeMainBlock(value){
    return{
        type: CHANGE_MAIN_BLOCK,
        payload:value
    }
}

export function WinTask(winType){
    return{
        type: IS_TASK_WIN,
        winType:winType
    }
}
export function TaskList(value=-1,winType){
    return{
        type: IS_TASK_LIST,
        payload:Math.floor(value),
       winType:winType
    }
}

export function TaskWinMutate(hash,winType){
   
    return{
     type: IS_EXISTING_TASK,
     payload: hash,
     winType:winType
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


export function craeteTodoList(name){
return{
    type:CREATE_TODO_LIST,
    payload:name
}

}


export function isTodoButtons(value){
    return{
        type:TODO_BUTTONS,
        payload:value
    }
}

export function deleteTodoCard(value){
    return{
        type:DEL_TODO_CARD,
        payload:value
    }
}



export function createTodoTask(value){
    return {
        type:CREATE_TODO_TASK,
        payload:value
    }
}


export function setTodoHash(hash){
   
return{
    type: GET_TODO_HASH,
    payload:hash
}
}


export function changeTodoItem(item,parent){
    return{
        type: TODO_ITEM_IS_CHANGED,
        item:item,
        parent:parent

    } 
}


export function isLogin(obj){
    return{
        type:IS_LOGIN,
        payload:obj
    }
}

export function switchUserWin(type){
    return{
        type:SWITCH_USER_WIN,
        payload:type
    }
}