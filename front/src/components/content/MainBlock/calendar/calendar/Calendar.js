import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import './calendar.css'
import CalendarCard from './CalendarCard'


const Calendar = (props) => {
    let calendarCards = [];
    let mouthTasks = props.tasks;

   useEffect(()=>{
      
   })


    for (let i = 0; i <mouthTasks.length; i++){
       
     calendarCards.push(<CalendarCard key={i} i={i} length={mouthTasks[i].length}/>) }
    return <div className="calendar">
        {calendarCards}
    </div>
}

const mapStateToProps = (state) => {
    return {
        
        numberOfDays: state.date.numberOfDays,
        tasks: state.task. currentMonthTasks,
        date: state.date.date
    }
}


export default connect(mapStateToProps, null)(Calendar);