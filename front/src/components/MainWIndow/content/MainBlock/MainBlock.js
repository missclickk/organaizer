import React from 'react'
import {connect} from 'react-redux'
import "./../content/content.css"
import Calendar from "./calendar/calendar/Calendar"
import WeekList from './calendar/weekList/WeekList'
import DateBlock from "./calendar/dateBlock/dateBlock"
import Buttons from './buttons/Buttons'
import ToDoList from './toDoList/ToDoList'

const MainBlock=({mode})=>{

return <div className='content__main'>
    <div className='content__main__header'>
   {mode==="TD_LIST" ? null:<DateBlock/>}
    <Buttons/>
    </div>
    <div className="content__main__items-conteiner">
    {mode==="TD_LIST" ? <ToDoList/>:  mode==='CALENDAR'?   <Calendar/>:<WeekList/>}
    </div>
</div>
}

const mapStateToProps=(state)=>{
    return{
        mode:state.render.mainBlockItem
    }
}

export default connect(mapStateToProps,null)(MainBlock);