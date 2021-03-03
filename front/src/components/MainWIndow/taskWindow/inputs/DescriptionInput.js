import React from 'react'
import './../TaskWindow.css'
import { connect } from "react-redux"

const DescriptionInput = ({ type, description }) => (<div className='task-conteiner__description-conteiner' >
    <label>Описание: </label>
    {
        type === "taskOutput" ? <textarea disabled="disabled" defaultValue={description} className="task-conteiner__description-conteiner__description-const" />
            : <textarea wrap="hard" cols="22" name="description" />}
</div>)

const mapStateToProps = (state) => {
    return { description: state.task.renderOneTask.description }

}
export default connect(mapStateToProps)(DescriptionInput);
