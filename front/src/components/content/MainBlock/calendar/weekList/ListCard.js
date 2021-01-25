import React from 'react'
import './WeekList.css'
import Task from './Task'
const ListCard=(props)=>{
    let arr=[];
    if(props.tasks.length!=0)
    arr=props.tasks.map((e)=>{
        return<Task task={e}/>
    })

    return <div className="week-list-card">
        <div className="week-list-conteiner__card__date">{props.date}</div>
        <div className="week-list-conteiner__card__tasks-conteiner">{arr}</div>
        
        </div>
}

export default ListCard;