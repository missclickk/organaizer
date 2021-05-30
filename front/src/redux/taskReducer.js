import { SET_ERROR_LIST_T, SET_ONE_TASK, SET_TASKS_D, SET_TASKS_W, SET_TASKS_M, CLEAR_ERROR_LIST, IS_TASK_WIN, IS_TASK_LIST } from './types'


const initialState = {
    tasks: [],
    currentMonthTasks: new Array(31).fill([]),
    currentWeekTasks: new Array(7).fill([]),
    renderTasks: [],
    renderOneTask: {},
    errorList: [],
    closeWin: false,
}



export const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_ERROR_LIST:
            return { ...state, errorList: [] }

        case IS_TASK_WIN:
            return { ...state, closeWin: false, renderOneTask: {} }

        //  case IS_EXISTING_TASK:
        //    return { ...state, renderOneTask:{}}

        case IS_TASK_LIST:
            return { ...state, closeWin: false, renderTask: [] };

        case SET_TASKS_M:
            return { ...state, currentMonthTasks: action.payload };
        case SET_TASKS_W:
            return { ...state, currentWeekTasks: action.payload };
        case SET_TASKS_D:
            return { ...state, closeWin: false, renderTask: action.payload };
        case SET_ERROR_LIST_T:
            const error = action.payload.map(e => {
                switch (e) {
                        case 6:
                            return "НАЗВАНИЕ НЕ ДОЛЖНО БЫТЬ ПУСТЫМ";
                            case 7:
                                return "ВВЕДИТЕ ДАТУ";
                            case 8:
                                return "ВВЕДИТЕ ВРЕМЯ";
                            case 9:
                                return "ВЫБЕРЕТЕ ХОТЯ БЫ ОДНОГО ПОЛЬЗОВАТЕЛЯ";
                            default:
                                return "ошибка";
                }
            })
            return { ...state, errorList: error  };
        case SET_ONE_TASK:
            return { ...state, renderOneTask: action.payload };

        default:
            return state;
    }

}