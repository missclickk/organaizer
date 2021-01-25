import moment from 'moment'
import { ADD_MESSAGE } from './types'
const EMPTY_MESSAGE="НЕТ СООБЩЕНИЙ";

const initialState = {
    messages: EMPTY_MESSAGE
}


const addToMessageList=(list,mes)=>{
    if(list===EMPTY_MESSAGE)
    list=``;
   list=list+`\n${moment().hour()}.${moment().minute()}: ${mes}`;
    return list;
}

export const chatReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            console.log(123);
            return {...state,messages:addToMessageList(state.messages,action.payload)}
        default:
            return state;
    }
}