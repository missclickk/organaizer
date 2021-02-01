import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import './WeekList.css'
import ListCard from './ListCard'
import {sortByTime} from './../../../../../../functions/tasksHandlers'
const WeekList = ({ weekRange, currentWeekTasks }) => {
    let weekDays = [];
    let clone =moment( weekRange.first);
    for (let i = 0; i < 7; i++){
        weekDays.push(<ListCard key={clone.date()} tasks={sortByTime(currentWeekTasks[i])} date={clone.date()} />)
        clone.add(1,'d');
    }

    return <div className="week-list">
        {weekDays}
    </div>
}

const mapStateToProps = (state) => {
    return {
        currentWeekTasks: state.task.currentWeekTasks,
        weekRange: state.date.weekRange
    }
}

export default connect(mapStateToProps, null)(WeekList);