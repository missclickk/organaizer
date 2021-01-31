import { IS_TASK_WIN, IS_TASK_LIST, IS_EXISTING_TASK, CHANGE_MAIN_BLOCK, TODO_BUTTONS } from "./types"
const TD_LIST='TD_LIST'
//CALENDAR WEEK_LIST TD_LIST main Block ITEM
//inputTask outputTask taskList todo todoTask    winType 
const initialState = {
    mainBlockItem:'CALENDAR',
    winType:null,
    todoBtns:false
}

export const renderReducer = (state = initialState, action) => {
    switch (action.type) {

        case IS_TASK_WIN:
            return {...state,winType:action.winType}
        case IS_TASK_LIST:
            return { ...state,winType:action.winType};
        case IS_EXISTING_TASK:
            return { ...state,winType:action.winType};
        case CHANGE_MAIN_BLOCK:
            return { ...state, mainBlockItem: action.payload, }
        case TODO_BUTTONS:
            return{...state,todoBtns:action.payload}
        default: return state
    }


}