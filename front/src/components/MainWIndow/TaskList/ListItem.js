import React from 'react'
import {connect} from 'react-redux'
import './TaskList.css'
import {TaskWinMutate,getOneTask} from '../../../redux/actions'
const ListItem = ({itemId,time,title,TaskWinMutate,getOneTask}) => {
const onClickHandker=()=>{
    console.log(itemId);
    getOneTask(itemId);
    TaskWinMutate("outputTask");
}
return <div id={itemId}  className='list-conteiner__list-card__task-card'  onClick={onClickHandker}>
    <div className='list-conteiner__list-card__task-card__time'>{time} </div>
    <div className='list-conteiner__list-card__task-card__title'>{title} </div>
</div> 
}

const mapDispatchToProps={
    TaskWinMutate,
    getOneTask
}

export default connect(null,mapDispatchToProps)(ListItem);