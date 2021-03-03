import React from 'react'
import { connect } from 'react-redux'
import './calendar.css'
import CalendarCard from './CalendarCard'
import { getTasks } from './../../../../../../redux/actions'

const Calendar = (props) => {
  
    let calendarCards = [];
    let mouthTasks = props.tasks;
    console.log(props.numberOfDays);
    for (let i = 0; i < props.numberOfDays; i++)
    if(mouthTasks[i]!==undefined && mouthTasks[i]!==null){
        calendarCards.push(<CalendarCard key={i} i={i} length={mouthTasks[i].length} />)
    }
        else{
        calendarCards.push(<CalendarCard key={i} i={i} length={0} />)
    }

   
    return <div className="calendar">
        {calendarCards}
    </div>
}

const mapStateToProps = (state) => {
    return {
        date:state.date.date,
        printMode: state.render.mainBlockItem,
        numberOfDays: state.date.numberOfDays,
        tasks: state.task.currentMonthTasks,
    }
}

const mapDispatchToProps = {
    getTasks
}
export default connect(mapStateToProps, mapDispatchToProps)(Calendar);