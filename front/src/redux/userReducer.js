import { LOGOUT, CHANGE_USER_LIST, SWITCH_USER_WIN, OPEN_APP, SET_ERROR_LIST_U } from './../redux/types'

const getItemFromLocalStorage = (itemName) => {
    const item = window.localStorage.getItem(itemName);
    if (item == null) {
        window.localStorage.setItem(itemName, 'null');
        return 'null';
    }
    return item;
}

const updateItemInLocalStorage = (itemName, itemVal) => {
    window.localStorage.setItem(itemName, itemVal)
    return itemVal;
}


const initialState = {
    isLogin: getItemFromLocalStorage('isLogin'),
    loginUser: getItemFromLocalStorage('login'),
    roomID: getItemFromLocalStorage('room'),
    usersList: [],
    errorList: []
}
export const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOGOUT:

            return { ...state, isLogin: false, loginUser: '', roomID: null }
        case CHANGE_USER_LIST:
            return { ...state, usersList: action.payload }
        case OPEN_APP:
            return { ...state, loginUser: updateItemInLocalStorage('login', action.login), isLogin: updateItemInLocalStorage('isLogin', 'login'), roomID: updateItemInLocalStorage('room', action.room) };
        case SET_ERROR_LIST_U:
            const errors = JSON.parse(action.payload);
            return {
                ...state, errorList: errors.map(e => {
                    switch (e) {
                        case 1: return "email занят";
                        case 2: return "слишком короткий логин";
                        case 3: return "невыерный пароль";
                        case 4: return "пароли не совпадают";
                        case 5: return "неверный email ";
                        default: return "ошибка где-то";
                    }
                })
            }
        case SWITCH_USER_WIN:
            return { ...state, errorList: [] }
        default:
            return state;
    }
}