import React from 'react'
import './WeekList.css'
import Task from './Task'
const ListCard=(props)=>{
    let arr=[];
    if(props.tasks!=undefined)
    arr=props.tasks.map((e,i)=>{
        return<Task key={i}  task={e}/>
    })

    return <div className="week-list-card">
        <div className="week-list-conteiner__card__date">{props.date}</div>
        <div className="week-list-conteiner__card__tasks-conteiner">{arr}</div>
        </div>
}

export default ListCard;