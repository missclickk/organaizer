
import moment from 'moment'
import { CHANGE_DATE} from "./types"
import { getNumberOfDays, changeMonthWithFlag, changeWeekWithFlag, getWeekRange } from './../functions/dateHandlers'
const CALENDAR = "CALENDAR"



const initialState = {

    date: moment(),
    numberOfDays: getNumberOfDays(),
    weekRange: getWeekRange(moment())
}


export const dateReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_DATE:

        const date = action.mode===CALENDAR? changeMonthWithFlag(action.payload, state.date): changeWeekWithFlag(action.payload, state.date);
            const  range=getWeekRange(date);    
            return { ...state, date: date, numberOfDays: getNumberOfDays(state.date),weekRange:range}
        default:
            return state
    }



}