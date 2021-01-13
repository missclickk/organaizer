
import moment from 'moment'
import {CHANGE_DATE} from "./types"


const changeDate = (flag,date) => {
    flag==="next" ? date.add(1,"M") :date.subtract(1,"M");
   // console.log(date.format());  
    return date;
}
const getNumberOfDays = (currentDate=moment()) => {
    switch (currentDate.month()) {
        case 0:
            return 31;
        case 1:
            return 28;
        case 2:
            return 31;
        case 3:
            return 30;
        case 4:
            return 31;
        case 5:
            return 30;
        case 6:
            return 31;
        case 7:
            return 31;
        case 8:
            return 30;
        case 9:
            return 31;
        case 10:
            return 30;
        case 11:
            return 31;

    }

}


const initialState={
    calendarMode:true,
    weekMode:false,
    date:moment(),
    numberOfDays:getNumberOfDays(),
    weekRange:{first:moment().subtract(moment().weekday()-1,"days"),
    last:moment().add(7-moment().weekday(),"days")}
}


export const dateReducer=(state=initialState,action)=>{
    
        switch(action.type){
            case CHANGE_DATE:

                return {...state,date:changeDate(action.payload,state.date),numberOfDays:getNumberOfDays(state.date)}
            default:
            return state
        }


   
}