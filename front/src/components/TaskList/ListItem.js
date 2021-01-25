import React from 'react'
import {connect} from 'react-redux'
import './TaskList.css'
import {TaskWinMutate} from './../../redux/actions'
const ListItem = (props) => {
const onClickHandker=()=>{
    props.TaskWinMutate(props.hash,true)
}
return <div id={props.hash}  className='list-conteiner__list-card__task-card'  onClick={onClickHandker}>
    <div className='list-conteiner__list-card__task-card__time'>{props.time} </div>
    <div className='list-conteiner__list-card__task-card__title'>{props.title} </div>
</div> 
}

const mapDispatchToProps={
    TaskWinMutate
}

export default connect(null,mapDispatchToProps)(ListItem);