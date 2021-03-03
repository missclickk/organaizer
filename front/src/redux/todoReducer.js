import { CHANGE_TASK_VALUE, CHANGE_ID, SET_TODOS, IS_TASK_WIN, GET_TODO_HASH } from './types'


const test = (tdTask, name, val) => {


    return   tdTask.map(e => {
        if (e.name === name)
            e.value = val;
        return e;
    })
}

const initialState = {
        todoTasks: [],
        closeWinTodo: false,
        taskHash: null,
        todoId: 1,
    }

    const deletePropretyFormObj = (obj, prop) => {
        let nObj = {}
        for (let i in obj)
            if (i !== prop) {
                nObj[i] = obj[i];
            }
        return nObj;
    }


    export const todoReducer = (state = initialState, action) => {

        switch (action.type) {
            case IS_TASK_WIN:
                return { ...state, closeWinTodo: false, taskHash: null }


            case GET_TODO_HASH:
                return { ...state, taskHash: action.payload }
            case CHANGE_TASK_VALUE:
                //
                const tasks = { ...state.todoTasks, [action.id]: { ...state.todoTasks[action.id], tasks: test(state.todoTasks[action.id].tasks, action.payload.name, action.payload.value) } };
                return { ...state,todoTask:tasks,testflag:1  };
            case SET_TODOS:
                return { ...state, todoTasks: action.payload }
            case CHANGE_ID:
                return { ...state, todoId: action.payload }
            default:
                return state;
        }

    }
//,todoTasksHash:{...state.todoTasksHash}.delete(`${action.payload}`)