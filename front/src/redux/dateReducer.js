
import moment from 'moment'
import { CHANGE_DATE, CHANGE_CALENDAR } from "./types"
import { getNumberOfDays, changeMonthWithFlag, changeWeekWithFlag, getWeekRange } from './../functions/dateHandlers'
const CALENDAR = "CALENDAR"
const WEEK_LIST = "wEEK_LIST"


const initialState = {
    printMode:  CALENDAR,
    date: moment(),
    numberOfDays: getNumberOfDays(),
    weekRange: getWeekRange(moment())
}


export const dateReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_DATE:

        const date = state.printMode==CALENDAR? changeMonthWithFlag(action.payload, state.date): changeWeekWithFlag(action.payload, state.date);
            const  range=getWeekRange(date);    
            return { ...state, date: date, numberOfDays: getNumberOfDays(state.date),weekRange:range}

            
        case CHANGE_CALENDAR:
            return { ...state, printMode: action.payload,}

        default:
            return state
    }



}