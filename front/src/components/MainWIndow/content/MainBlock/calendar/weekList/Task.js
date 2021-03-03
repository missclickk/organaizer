import React from 'react'
import { connect } from 'react-redux'
import { TaskWinMutate,getOneTask } from './../../../../../../redux/actions'
import './WeekList.css'

const Task = ({ task, TaskWinMutate,getOneTask }) => {
    const onClickHandler = (event) => {
        getOneTask(event.target.id);
        TaskWinMutate('outputTask');
    }
    return <div id={task.id} className='week-list-conteiner__card__tasks-conteiner__task' onClick={onClickHandler}>
        {`${task.time} ${task.title}`}
    </div>
}


const mapDispathToProps = {
    TaskWinMutate,
    getOneTask
}
export default connect(null,mapDispathToProps)(Task);