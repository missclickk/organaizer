import React from 'react'
import {connect} from 'react-redux'
import "./../content/content.css"
import Calendar from "./calendar/calendar/Calendar"
import WeekList from './calendar/weekList/WeekList'
import DateBlock from "./calendar/dateBlock/dateBlock"
import Buttons from './buttons/Buttons'


const MainBlock=(props)=>{
const renderElem= props.mode==="CALENDAR" ? <Calendar/>:<WeekList/> ;
return <div className='content__main'>
    <div className='content__main__header'>
    <DateBlock/>
    <Buttons/>
    </div>
    {renderElem}
</div>
}

const mapStateToProps=(state)=>{
    return{
        mode:state.date.printMode
    }
}

export default connect(mapStateToProps,null)(MainBlock);