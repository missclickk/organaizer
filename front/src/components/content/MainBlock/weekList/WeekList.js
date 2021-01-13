import React from 'react'
import {connect} from 'react-redux'
import './WeekList.css'
import moment from 'moment'
const WeekList=(props)=>{

    let weekDays=[];
    let endPoint=moment().weekday()-1;
    for(let i=0;i<endPoint;i++)
    {
        weekDays[i]=<h1>{moment().subtract(endPoint-i,"days").date()}</h1>
    }
    for(let i=0;i<7-endPoint;i++)
    {
        weekDays[endPoint+i]=<h1>{moment().add(i,"days").date()}</h1>
    }
return <div className="week-list">
    <h1>{moment().subtract(moment().weekday()-1,"days").date()}</h1>
    <h2>{moment().add(7-moment().weekday(),"days").date()}</h2>
    <h2>{moment().date()}</h2>
    {weekDays}
     </div>
}

export default WeekList;