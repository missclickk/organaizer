import { END_LOADING,START_LOADING,SWITCH_USER_WIN, IS_TASK_WIN, IS_TASK_LIST, IS_EXISTING_TASK, CHANGE_MAIN_BLOCK, TODO_BUTTONS } from "./types"
//CALENDAR  ,  WEEKLIST , TD_LIST  =====    main block items
//inputTask outputTask taskList todo todoTask    winType 
// REG AUTH                                         userWinType
const initialState = {
    mainBlockItem: 'TD_LIST',
    winType: null,
    todoBtns: false,
    userWinType: 'REG',
    isLoading: false,
  
}

export const renderReducer = (state = initialState, action) => {
    switch (action.type) {

        case IS_TASK_WIN:
            return { ...state, winType: action.winType }
        case IS_TASK_LIST:
            return { ...state, winType: action.winType };
        case IS_EXISTING_TASK:
            return { ...state, winType: action.winType };
        case CHANGE_MAIN_BLOCK:
            return { ...state, mainBlockItem: action.payload, }
        case TODO_BUTTONS:
            return { ...state, todoBtns: action.payload }
        case SWITCH_USER_WIN:
            return { ...state, userWinType: action.payload }
        case START_LOADING:
            return { ...state, isLoading: true}
        case END_LOADING:
            return { ...state, isLoading: false }
        default: return state
    }


}