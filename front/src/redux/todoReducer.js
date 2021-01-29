import { CREATE_TODO_LIST, IS_TASK_WIN, DEL_TODO_CARD ,CREATE_TODO_TASK, GET_TODO_HASH,  TODO_ITEM_IS_CHANGED} from './types'





const initialState = {
    todoTasksHash: {f:{ttt:false}},
    closeWinTodo: false,
    taskHash:null
}

const deletePropretyFormObj = (obj, prop) => {
    let nObj = {}
    for (let i in obj)
        if (i != prop) {
            nObj[i] = obj[i];
        }
    return nObj;
}


export const todoReducer = (state = initialState, action) => {

    switch (action.type) {
        case CREATE_TODO_LIST:
            return { ...state, todoTasksHash: { ...state.todoTasksHash, [`${action.payload}`]: {} }, closeWinTodo: true }
        case IS_TASK_WIN:
            return { ...state, closeWinTodo: false,taskHash:null}
        case DEL_TODO_CARD:
            return { ...state, todoTasksHash: deletePropretyFormObj(state.todoTasksHash, action.payload) };
        
        case CREATE_TODO_TASK:

            return{...state,closeWinTodo: true ,todoTasksHash:{...state.todoTasksHash,[state.taskHash]:{...state.todoTasksHash[state.taskHash],[action.payload]:false}}}   
         case  GET_TODO_HASH:
             return{...state,taskHash:action.payload}
        case TODO_ITEM_IS_CHANGED:
         
            return{...state,todoTasksHash:{...state.todoTasksHash,[action.parent]:{...state.todoTasksHash[action.parent],[action.item]:!state.todoTasksHash[action.parent][action.item]}}}
             default:
            return state;
    }

}
//,todoTasksHash:{...state.todoTasksHash}.delete(`${action.payload}`)