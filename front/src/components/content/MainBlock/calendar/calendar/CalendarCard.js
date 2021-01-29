import React from 'react'
import {connect} from 'react-redux'
import './calendar.css'
import {TaskList}  from './../../../../../redux/actions'
const CalendarCard=(props)=>{
    const createContent=({i,length})=>{
       let iDiv=<div>{i+1}</div>
       let lengthDiv;
       if(length)
       switch (length) {
           case 1:
            lengthDiv=<div id={i} className="calendar__card__content-conteiner__tasks-number">{`${length} задача`}</div>
               break;
               case 2:
                lengthDiv=<div id={i} className="calendar__card__content-conteiner__tasks-number">{`${length} задачи`}</div>
                   break;
                   case 3:
                    lengthDiv=<div id={i} className="calendar__card__content-conteiner__tasks-number">{`${length} задачи`}</div>
                       break;
                       case 4:
                        lengthDiv=<div id={i} className="calendar__card__content-conteiner__tasks-number">{`${length} задачи`}</div>
                           break;
           default:
                lengthDiv=<div id={i} className="calendar__card__content-conteiner__tasks-number">{`${length} задач`}</div>
                
               break;
       }
      
       return <div className="calendar__card__content-conteiner">
                    {iDiv}
                    {lengthDiv}
               </div>
    }

    const onClickHandler=(event)=>{
      props.openTaskList(event.target.id,"taskList");}
  

return <div onClick={onClickHandler} id={props.i} className="calendar__card">{ createContent({...props})}</div>
}

const mapDispatchToProps={

   openTaskList:TaskList
}
export default connect(null,mapDispatchToProps)(CalendarCard);