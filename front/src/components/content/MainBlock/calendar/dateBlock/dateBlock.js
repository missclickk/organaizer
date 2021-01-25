import React, { useState, useEffect } from "react"
import { connect } from 'react-redux'
import "./dateBlock.css"
import { changeDate } from "./../../../../../redux/actions"
const DateBlock = (props) => {
    const [dateFlag, setDateFlag] = useState(true);
    let date;

    useEffect(()=>{
        setDateFlag(true);
    },[props.mode])

    useEffect(() => {
        if (dateFlag === true) {
            date = props.mode==="CALENDAR"? ((props.date.month() + 1) + ":" + props.date.year())
            :`${props.weekRange.first.date()}:${props.weekRange.first.month()+1}-${props.weekRange.last.date()}:${props.weekRange.last.month()+1}` ;
          
            document.querySelector(`.dateBlock__date`).innerHTML = date;
            setDateFlag(false);
        }
    })



    const onClickHandler = event => {
        props.changeDate(event.target.name,props.mode);
        setDateFlag(true);
    }
    return <div className="dateBlock">
        <div className="dateBlock__arrowLeft" name="prev" onClick={onClickHandler}><img name="prev" className="dateBlock__arrowImg" alt="Влево" src="./arrowLeft.jpeg" /></div>
        <div className="dateBlock__date">{date}</div>
        <div className="dateBlock__arrowRight" name="next" onClick={onClickHandler}><img name="next" className="dateBlock__arrowImg" alt="Вправо" src="./arrowRight.jpeg" /></div>

    </div>

}

const mapStateToProps = state => {

    return {
        date: state.date.date,
        mode:state.date.printMode,
        weekRange:state.date.weekRange,
        list: state.task.errorList
    }
}
const mapDispatchToProps = {
    changeDate
}
export default connect(mapStateToProps, mapDispatchToProps)(DateBlock);
