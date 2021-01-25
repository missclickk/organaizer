import React from 'react'
import './../TaskWindow.css'
import { connect } from "react-redux"
const PeriodInput = ({period}) => {
    let elem;
   


    return <div className='task-conteiner__repeat-period-conteiner'>
        <label>Период повтореня: </label>
            {elem}
    </div>
}
const mapStateToProps = (state) => {
    return { period: state.task.renderOneTask.period }
}
export default connect(mapStateToProps)(PeriodInput);