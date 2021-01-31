import React from 'react'
import './../TaskWindow.css'
import { connect } from "react-redux"
const PeriodInput = ({period,type}) => {
   
 const elem=type==="taskInput"?<select name="period">
 <option value="never">НИКОГДА</option>
 <option value="day">КАЖДЫЙ ДЕНЬ</option>
 <option value="week">КАЖДУЮ НЕДЕЛЮ</option>
 <option value="month">КАЖДЫЙ МЕСЯЦ</option>
 <option value="year">КАЖДЫЙ ГОД</option>
</select>:<div>{period}</div>


    return <div className='task-conteiner__repeat-period-conteiner'>
        <label>Период повтореня: </label>
            {elem}
    </div>
}
const mapStateToProps = (state) => {
    return { period: state.task.renderOneTask.period }
}
export default connect(mapStateToProps)(PeriodInput);