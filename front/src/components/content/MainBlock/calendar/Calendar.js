import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import styles from './calendar.module.css'





const Calendar = (props) => {

    let calendarBlocks=[];


    
for(let i=1;i<=props.numberOfDays;i++)
calendarBlocks.push(<div key={i} className={styles.calendar__block}>{i}</div>);
    return <div className={styles.calendar}>    
        {calendarBlocks}
    </div>
}

const mapStateToProps=(state)=>{
return{
    numberOfDays:state.date.numberOfDays
}
}


export default connect(mapStateToProps,null)(Calendar);