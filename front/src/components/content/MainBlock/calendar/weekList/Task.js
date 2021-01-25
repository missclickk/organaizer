import React from 'react'
import { connect } from 'react-redux'
import { TaskWinMutate } from './../../../../../redux/actions'
import './WeekList.css'

const Task = ({ task, TaskWinMutate }) => {
    const onClickHandler = () => {
        TaskWinMutate(task.title,true)
    }

    return <div className='week-list-conteiner__card__tasks-conteiner__task' onClick={onClickHandler}>
        {`${task.time} ${task.title}`}
    </div>
}


const mapDispathToProps = {
    TaskWinMutate
}
export default connect(null,mapDispathToProps)(Task);