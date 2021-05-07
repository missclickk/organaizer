import React from 'react'
import { connect } from 'react-redux'

import './TaskList.css'
import { TaskWinMutate, getOneTask, deleteOneTask, getTasks } from './../../../../redux/actions'
import DeleteBtn from './../../buttons/DeleteBtn'



const ListItem = ({ mode,date,room,login,itemId, time, title, TaskWinMutate, getOneTask, getTasks, deleteOneTask }) => {
    const onClickHandker = (event) => {
        const t=event.target;
      if(t!==document.querySelector('.small')){
        getOneTask(itemId);
       TaskWinMutate("outputTask");}
    }
    return <div id={itemId} className='list-conteiner__list-card__task-card' onClick={onClickHandker}>
        <div className='list-conteiner__list-card__task-card__time'>{time} </div>
        <div className='list-conteiner__list-card__task-card__title'>{title} </div>
        <DeleteBtn funArr={[deleteOneTask, getTasks]} args={{ 0: [itemId], 1: [mode, date, room,login] }} />
    </div>
}

const mapStateToPorops = (state) => ({
    mode: state.render.mainBlockItem,
    login: state.user.loginUser,
    room: state.user.roomID,
    date: state.date.date,
})
const mapDispatchToProps = {
    TaskWinMutate,
    getOneTask,
    getTasks,
    deleteOneTask
}

export default connect(mapStateToPorops, mapDispatchToProps)(ListItem);