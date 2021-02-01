import React from 'react'
import './../TaskWindow.css'
import { connect } from "react-redux"
const TimeInput = ({type,time }) => (<div className='task-conteiner__time-conteiner'>
    <label>Время:</label>
    { type === "taskOutput" ? <label>{time}</label> : <input name="time" type="time" />}
</div>
)
const mapStateToProps = (state) => {
    return { time: state.task.renderOneTask.time }
}
export default connect(mapStateToProps)(TimeInput);