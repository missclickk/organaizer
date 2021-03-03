import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import "./../content/content.css"
import Calendar from "./calendar/calendar/Calendar"
import WeekList from './calendar/weekList/WeekList'
import DateBlock from "./calendar/dateBlock/dateBlock"
import Buttons from './buttons/Buttons'
import ToDoList from './toDoList/ToDoList'
import {getTasks,getTodos} from './../../../../redux/actions'
const MainBlock=({room, login,mode,printMode,date,getTasks,getTodos,isLoading})=>{
    useEffect(() => {
       if(printMode=="TD_LIST")
       getTodos(login,room);
       else
        getTasks(printMode, date,room,login);
    }, [printMode,date,getTasks,getTodos]);

return isLoading?<div  className='content__main'>Spinner</div>: <div className='content__main'>
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
        mode:state.render.mainBlockItem,
        date: state.date.date,
        printMode: state.render.mainBlockItem,
        isLoading:state.render.isLoading,
        login:state.user.loginUser,
        room:state.user.roomID
    }
}
const mapDispatchToProps = {
    getTasks,
    getTodos
}
export default connect(mapStateToProps, mapDispatchToProps)(MainBlock);