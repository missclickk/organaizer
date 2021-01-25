import React from 'react'
import './../TaskWindow.css'
import { connect } from "react-redux"
const TitleInput = ({ output, title }) => (<div className='task-conteiner__title-conteiner'>
    <label>Название: </label>
    {output === true ? <label>{title}</label> : <input name="title" type="text"></input>}
</div>
)
const mapStateToProps = (state) => {
    return { title: state.task.renderOneTask.title }
}
export default connect(mapStateToProps)(TitleInput);