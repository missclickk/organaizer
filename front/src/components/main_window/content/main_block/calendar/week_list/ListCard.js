import React from 'react'
import './WeekList.css'
import Task from './Task'
const ListCard=(props)=>{
    let tasks=[];
    if(props.tasks!==undefined)
     tasks=props.tasks.map((e,i)=>{
        return<Task key={i}  task={e}/>
    })

    return <div className="week-list-card">
        <div className="week-list-conteiner__card__date">{props.date}</div>
        <div className="week-list-conteiner__card__tasks-conteiner">{tasks}</div>
        </div>
}

export default ListCard;