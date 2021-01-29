import React from 'react'
import {connect} from 'react-redux'
import './TaskList.css'
import {TaskWinMutate} from './../../redux/actions'
const ListItem = ({hash,time,title,TaskWinMutate}) => {
const onClickHandker=()=>{
    console.log("hi mark")
    TaskWinMutate(hash,"outputTask")
}
return <div id={hash}  className='list-conteiner__list-card__task-card'  onClick={onClickHandker}>
    <div className='list-conteiner__list-card__task-card__time'>{time} </div>
    <div className='list-conteiner__list-card__task-card__title'>{title} </div>
</div> 
}

const mapDispatchToProps={
    TaskWinMutate
}

export default connect(null,mapDispatchToProps)(ListItem);