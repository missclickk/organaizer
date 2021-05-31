import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import './calendar.css'
import {TaskList,getTasks}  from '../../../../../../redux/actions'
const CalendarCard=(props)=>{
    const createContent=({i,length})=>{
       let iDiv=<div>{i.date()}</div>
       let lengthDiv;
       if(length)
       switch (length) {
           case 1:
            lengthDiv=<div id={i.format()} className="calendar__card__content-conteiner__tasks-number">{`${length}`} <span>событие</span></div>
               break;
               case 2:
                lengthDiv=<div id={i.format()} className="calendar__card__content-conteiner__tasks-number">{`${length}`} <span>события</span></div>
                   break;
                   case 3:
                    lengthDiv=<div id={i.format()} className="calendar__card__content-conteiner__tasks-number">{`${length}`} <span>события</span></div>
                       break;
                       case 4:
                        lengthDiv=<div id={i.format()} className="calendar__card__content-conteiner__tasks-number">{`${length}`} <span>события</span></div>
                           break;
           default:
                lengthDiv=<div id={i.format()} className="calendar__card__content-conteiner__tasks-number">{``}</div>
                
               break;
       }
      
       return <div className="calendar__card__content-conteiner">
                    {iDiv}
                    {lengthDiv}
               </div>
    }

    const onClickHandler=(event)=>{
      props.openTaskList(event.target.id,"taskList");
      console.log(event.target);
      props.getTasks("taskList", moment(event.target.id),props.room,props.login);
   }
  let id=moment(props.date).date(props.i+1);
return <div onClick={onClickHandler} id={id.format()} className="calendar__card">{ createContent({...props,i:id})}</div>
}

const mapDispatchToProps={

   openTaskList:TaskList,
   getTasks
}
const mapStateToProps=(state)=>{
   return{
      date:state.date.date,
      login:state.user.loginUser,
      room:state.user.roomID
   }
}
export default connect(mapStateToProps,mapDispatchToProps)(CalendarCard);