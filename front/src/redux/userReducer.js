import { CHANGE_USER_LIST, SWITCH_USER_WIN,OPEN_APP, SET_ERROR_LIST_U } from './../redux/types'

const getItemFromLocalStorage = (itemName) => {
    const item = window.localStorage.getItem(itemName);
    if (item == null) {
        window.localStorage.setItem(itemName, 'null');
        return 'null';
    }
    return item;
}

const updateItemInLocalStorage=(itemName,itemVal)=>{
    window.localStorage.setItem(itemName,itemVal)
    return itemVal;
}


const initialState = {
    isLogin:getItemFromLocalStorage('isLogin'),
    loginUser:getItemFromLocalStorage('login'),
    roomID:getItemFromLocalStorage('room'),
    usersList: [],
    errorList: []
}/*
const initialState = {
    isLogin:'login',
    usersList:["jopa",'tester1','i bezdarni yrod','mne strahno'],
    loginUser: "jopa",
    usersGroup: [],
    errorList: null
}
*/
export const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case CHANGE_USER_LIST:
            return{...state, usersList:action.payload}
        case  OPEN_APP: 
                return { ...state, loginUser:updateItemInLocalStorage('login',action.login),isLogin:updateItemInLocalStorage('isLogin','login'),roomID:updateItemInLocalStorage('room',action.room)};
        case SET_ERROR_LIST_U:
            return { ...state,  errorList:action.payload }
        case  SWITCH_USER_WIN:
            return {...state,errorList:[]}
            default:
            return state;
    }
}