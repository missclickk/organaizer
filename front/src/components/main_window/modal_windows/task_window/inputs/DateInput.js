import React from 'react'
import { connect } from 'react-redux'
import '../TaskWindow.css'

const DateInput = ({date }) => {
    return<div className='task-conteiner__date-conteiner'>
    <label>Дата: </label>
    <input name="date" type="date"/>
</div>}

const mapPropsToState = (state) => {
    return {
        date: state.date.date
    }
}
export default connect(mapPropsToState, null)(DateInput);