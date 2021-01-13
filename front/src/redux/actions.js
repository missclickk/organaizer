import {CHANGE_DATE,ADD_MESSAGE} from "./types"
export function changeDate(flag){
    return{
            type:CHANGE_DATE,
            payload:flag
    }
}


export function addMessage(value){
    return{
        type:ADD_MESSAGE,
        payload:value
    }
}