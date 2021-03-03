import React, { useState, useEffect } from "react"
import { connect } from 'react-redux'
import "./dateBlock.css"
import { changeDate,getTasks } from "./../../../../../../redux/actions"
const DateBlock = ({login,room,printMode ,mode, weekRange, changeDate,getTasks, date }) => {
    const [dateFlag, setDateFlag] = useState(true);

    useEffect(() => {
        setDateFlag(true);
    }, [mode])

    useEffect(() => {
        if (dateFlag === true) {
            document.querySelector(`.dateBlock__date`).innerHTML = mode === "CALENDAR" ? ((date.month() + 1) + ":" + date.year())
                : `${weekRange.first.date()}:${weekRange.first.month() + 1}-${weekRange.last.date()}:${weekRange.last.month() + 1}`;
            setDateFlag(false);
        }
    },[setDateFlag,date, dateFlag, mode, weekRange.first,weekRange.last])

    const onClickHandler =  async(event) => {
        changeDate(event.target.name, mode);
         getTasks(printMode, date,room,login);
        setDateFlag(true);
    }
    
    return <div className="dateBlock">
        <div className="dateBlock__arrowLeft" name="prev" onClick={onClickHandler}><img name="prev" className="dateBlock__arrowImg" alt="Влево" src="./arrowLeft.jpeg" /></div>
        <div className="dateBlock__date"></div>
        <div className="dateBlock__arrowRight" name="next" onClick={onClickHandler}><img name="next" className="dateBlock__arrowImg" alt="Вправо" src="./arrowRight.jpeg" /></div>

    </div>

}

const mapStateToProps = state => {

    return {
        printMode:state.render.mainBlockItem,
        date: state.date.date,
        mode: state.render.mainBlockItem,
        weekRange: state.date.weekRange,
        login:state.user.loginUser,
        room:state.user.roomID
    }
}
const mapDispatchToProps = {
    changeDate,
    getTasks
}
export default connect(mapStateToProps, mapDispatchToProps)(DateBlock);
