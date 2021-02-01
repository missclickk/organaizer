import { IS_LOGIN } from './../redux/types'
import { getErrorList } from '../functions/userHandler'
const getLoginFromLocalStorage = () => {
    const item = window.localStorage.getItem('login');
    if (item == null) {
        window.localStorage.setItem('login', 'notLogin');
        return 'notLogin';
    }
    return item;
}

const setLoginInLocalStorage=(login)=>{
    window.localStorage.setItem('login', login)
}

const initialState = {
    isLogin: getLoginFromLocalStorage(),
    loginUser: null,
    usersGroup: [],
    errorList: null
}


export const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case IS_LOGIN:
            const list = getErrorList(action.payload);
            if(list.length === 0){
                    setLoginInLocalStorage( 'login');
                    console.log(getLoginFromLocalStorage());
                return { ...state, loginUser: action.payload.email, isLogin:getLoginFromLocalStorage() }
            }
        else
            return { ...state, errorList: list }

        default:
            return state;
    }
}