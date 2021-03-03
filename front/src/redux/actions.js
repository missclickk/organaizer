import {CHANGE_USER_LIST, OPEN_APP, SET_ERROR_LIST_U, CHANGE_TASK_VALUE, CHANGE_ID, SET_TODOS, SET_ONE_TASK, SET_TASKS_D, END_LOADING, START_LOADING, SET_ERROR_LIST_T, SET_TASKS_M, SET_TASKS_W, SWITCH_USER_WIN, IS_LOGIN, CHANGE_MAIN_BLOCK, CHANGE_DATE, ADD_MESSAGE, IS_TASK_WIN, CLEAR_ERROR_LIST, IS_EXISTING_TASK, IS_TASK_LIST, TODO_BUTTONS} from "./types"





///////////////////////////////////////////??????
export function isLogin(obj) {
    return {
        type: IS_LOGIN,
        payload: obj
    }
}
export function clearErrorList() {

    return {
        type: CLEAR_ERROR_LIST
    }
}

//////////////////////////////////////////CHAT
export function addMessage(value) {
    return {
        type: ADD_MESSAGE,
        payload: value
    }
}



//////////////////////////////////////////DATE

export function changeDate(flag, mode) {
    return {
        type: CHANGE_DATE,
        mode: mode,
        payload: flag,
    }
}

//////////////////////////////////////////USERS
export function getUsersList(room){
    return async dispatch=>{
        dispatch(startLoading())
        const headers={'Content-type':'application/json',room};
        const response=await fetch('/api/users/list',{method:"GET",headers});
        const json = await response.json();
        dispatch({
            type:CHANGE_USER_LIST,
            payload:json.logins
        })
        dispatch(endLoading())
    }

}
export function regUser({ email, login, password, rPassword,room=null }) {
    return async dispatch => {
        const headers = { 'Content-Type': 'application/json' };
        const bodyValue= room===null?{ email, password, rPassword, login }:{ email, password, rPassword, login,room};
        const body = JSON.stringify(bodyValue);
        const response = await fetch('/api/users/registr', { method: 'POST', body, headers });
        const json = await response.json();
        if (response.status !== 200)
            dispatch({ type: SET_ERROR_LIST_U, payload: json.message })
            else dispatch({ type: OPEN_APP, login: json.login,room:json.room })
    }
}
export function authUser({ email, password }) {
    return async dispatch => {
        const headers = { 'Content-Type': 'application/json' };
        const body = JSON.stringify({ email, password });
        const response = await fetch('/api/users/auth', { method: 'POST', body, headers });
        const json = await response.json();
        console.log(json.login);
        if (response.status === 400)
            dispatch({ type: SET_ERROR_LIST_U, payload: json.message })
        else dispatch({ type: OPEN_APP, login: json.login,room:json.room })
    }
}
/////////////////////////////////////////RENDER
export function startLoading() {
    return { type: START_LOADING }
}
export function endLoading() {
    return { type: END_LOADING }
}
export function switchUserWin(type) {
    return {
        type: SWITCH_USER_WIN,
        payload: type
    }
}
export function isTodoButtons(value) {
    return {
        type: TODO_BUTTONS,
        payload: value
    }
}
export function changeMainBlock(value) {
    return {
        type: CHANGE_MAIN_BLOCK,
        payload: value
    }
}

export function WinTask(winType) {
    return {
        type: IS_TASK_WIN,
        winType: winType
    }
}
export function TaskList(value = -1, winType) {
    return {
        type: IS_TASK_LIST,
        payload: Math.floor(value),
        winType: winType
    }
}

export function TaskWinMutate(winType) {

    return {
        type: IS_EXISTING_TASK,
        winType: winType
    }
}



/////////////////////////////////////////TASKS
export function createTask(task,room) {
    return async dispatch => {
        const headers = { 'Content-Type': 'application/json' };
        const body = JSON.stringify({ task,room })
        const response = await fetch('/api/task/oneTask', { method: 'POST', body, headers });

        if (response.status === 200)
            dispatch({
                type: IS_TASK_WIN,
                payload: null
            })
        else {
            const json = await response.json();
            dispatch({
                type: SET_ERROR_LIST_T,
                payload: json.message.map(e => e.msg),
            })
        }
    }
}


export function getTasks(mode, date,room,login) {
    return async dispatch => {
        dispatch(startLoading());
        const headers = { 'Content-Type': 'application/json', _date: date.format(),room,login,mode };
        let type;
        switch (mode) {
            case "CALENDAR":
                type=SET_TASKS_M;
                break;
            case 'WEEKLIST':
                type=SET_TASKS_W;
                break;
            case "taskList":
                type=SET_TASKS_D;
                break;
            default:
                break;    
        }
        const response = await fetch('/api/task/TasksForRange', { method: 'GET', headers });
        const json = await response.json();
        dispatch({type,payload:json.tasks});
        dispatch(endLoading());
    }
}

export function getOneTask(id) {
    return async dispatch => {
        dispatch(startLoading());
        const headers = { 'Content-type': 'application/json', id: id };
        const response = await fetch('/api/task/oneTask', { method: 'GET', headers });
        const json = await response.json();
        dispatch({ type: SET_ONE_TASK, payload: json });
        dispatch(endLoading());
    }
}



////////////////////////////////////////TODO

export function setTodoTask(id, title) {
    return async dispatch => {
        dispatch(startLoading());
        const headers = { 'Content-type': 'application/json' };
        const body = JSON.stringify({ id, task: title });
        const response = await fetch('/api/todo/task', { method: 'POST', body, headers });
        if (response.status === 400) {
            const json = await response.json();
            dispatch({
                type: SET_ERROR_LIST_T,
                payload: json.message.map(e => e.msg),
            })
        }
        else
            dispatch({
                type: IS_TASK_WIN,
                payload: null
            })
        dispatch(endLoading());

    }
}

export function addTodo(todo,room) {

    return async dispatch => {
        const headers = { 'Content-type': 'application/json' }
        const body = JSON.stringify({ todo,room });
        const response = await fetch('/api/todo/lists', { method: 'POST', body, headers })
        if (response.status === 400) {

        }
        else
            dispatch({
                type: IS_TASK_WIN,
                payload: null
            })
    }
}

export function getTodos(user,room) {
    return async dispatch => {
        dispatch(startLoading());
        const headers = { 'Content-type': 'application/json', user,room };
        const response = await fetch('/api/todo/lists', { method: 'GET', headers });
        if (response.status === 200) {
            const json = await response.json();
            dispatch({ type: SET_TODOS, payload: json.todo });
        }
        dispatch(endLoading());
    }

}


export function deleteTodo(value) {
    console.log(value);
    return async dispatch => {

        const headers = { 'Content-type': 'application/json', 'target': value };
        await fetch('/api/todo/lists', { method: "DELETE", headers })

    }
}



export function changeTodoTask(item, parent, val, index) {

    return async dispatch => {
        dispatch(startLoading());
        const headers = { 'Content-type': 'application/json' };
        const body = JSON.stringify({ id: parent, task: item, value: val });
        const response = await fetch('/api/todo/task', { method: 'PATCH', body, headers });
        if (response.status === 200)
            dispatch({
                type: CHANGE_TASK_VALUE,
                payload: { name: item, value: !val },
                id: parent,
                index: index
            })
        dispatch(endLoading());
    }
}
export function setTodoId(id) {
    return {
        type: CHANGE_ID,
        payload: id
    }
}