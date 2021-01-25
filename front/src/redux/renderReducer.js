import { IS_TASK_WIN, IS_TASK_LIST, IS_EXISTING_TASK } from "./types"


const initialState = {
    isNewTask: false,
    isTaskList: false,
    isTask:false
}

export const renderReducer = (state = initialState, action) => {
    switch (action.type) {

        case IS_TASK_WIN:
            return state.isTask?{ ...state, isNewTask: action.payload,isTask:false}:{ ...state, isNewTask: action.payload}
        case IS_TASK_LIST:
            return { ...state, isTaskList: action.flag };

        case IS_EXISTING_TASK:
            return { ...state,  isNewTask: action.flag, isTaskList:false,  isTask:action.flag };
        default: return state
    }


}