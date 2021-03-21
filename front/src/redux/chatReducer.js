import { INCOMIG_MSG, ADD_MESSAGE, TYPING } from './types'
const EMPTY_MESSAGE = [{hour:"",minute:"",loginUser:" ",msg:"НЕТ СООБЩЕНИЙ"}];

const initialState = {
    messages: EMPTY_MESSAGE,
    writeVal: ""
}

export const chatReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            return { ...state, messages: state.messages===EMPTY_MESSAGE?[action.payload]:[...state.messages,action.payload], writeVal: "" }
        case INCOMIG_MSG:
            return { ...state,messages: state.messages===EMPTY_MESSAGE?[...action.payload]:[...state.messages,...action.payload], writeVal: "" }
        case TYPING:
            return { ...state, writeVal: action.payload }

        default:
            return state;
    }
}