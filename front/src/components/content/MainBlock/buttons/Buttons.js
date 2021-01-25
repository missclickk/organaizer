import React from 'react'
import {connect} from 'react-redux'
import {changeCalendarMode,WinTask}from '../../../../redux/actions'
import "./Buttons.css"

const Buttons=(props)=>{
const onClickHandler=(event)=>{
    const key=event.target.name;
    switch(key)
    {
         case "mode":
            props.mode==="CALENDAR" ?  props.changeCalendarMode("WEEKLIST") :   props.changeCalendarMode("CALENDAR")
            break;
            case "newTask":
             props.openWinTask(true);
             break;
        default: break;
    }
}

let imgSrc=props.mode==="CALENDAR" ?  "./list1.png":"./calendar.jpg"

return <div className="buttons-block">
    <div className="buttons-block__mode-btn"  onClick={onClickHandler} ><img  name="mode" alt="Change MODE " className="buttons-block__btn__img" src={imgSrc}/></div>
    <div className="buttons-block__task-btn" onClick={onClickHandler}><img  name="newTask" alt="NEW TASK"  className="buttons-block__btn__img" src="./newTask.png"/></div>
    <div className="buttons-block__to-do-btn">ХЗ</div>
</div>
}

const mapDispatchToProps={
changeCalendarMode,
openWinTask:WinTask
}
const mapStateToProps=(state)=>{
    return{
        mode:state.date.printMode
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(Buttons);
