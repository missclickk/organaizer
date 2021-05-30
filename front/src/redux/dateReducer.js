
import moment from 'moment'
import { CHANGE_DATE} from "./types"
import { getNumberOfDays, getNewDate, getWeekRange } from './../functions/dateHandlers'

const initialState = {

    date: moment(),
    numberOfDays: getNumberOfDays(),
    weekRange: getWeekRange(moment())
}
/*



*/ 

export const dateReducer = (state = initialState, action) => {

    switch (action.type) {
        case CHANGE_DATE:
            console.log(state.date.format());
        const date =getNewDate(action.mode,action.payload,state.date); 
            const  range=getWeekRange(date);    
            console.log("here"+date.format());
            return { ...state, date: date, numberOfDays: getNumberOfDays(date),weekRange:range}
        default:
            return state
    }



}