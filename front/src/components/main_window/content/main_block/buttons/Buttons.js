import React from 'react'
import { connect } from 'react-redux'
import { WinTask, changeMainBlock } from '../../../../../redux/actions'
import "./Buttons.css"

const Buttons = ({ mainBlockItem, changeMainBlock, openWinTask }) => {
    const onClickHandler = (event) => {
        const key = event.target.name;
        switch (key) {
            case "mode":
                mainBlockItem === "CALENDAR" ? changeMainBlock("WEEKLIST") : changeMainBlock("CALENDAR")
                break;
            case "newTask":
                mainBlockItem === "TD_LIST" ? openWinTask("todo") : openWinTask("inputTask");
                break;
            case "td":
                mainBlockItem === "TD_LIST" ? changeMainBlock("CALENDAR") : changeMainBlock("TD_LIST");
                break;
            default: break;
        }
    }

    const imgSrc = mainBlockItem === "CALENDAR" ? "./week.svg" : "./calendar.svg"
    const imgSRcTD = mainBlockItem === "TD_LIST" ? "./time.svg" : './todo1.svg'
    return <div className="buttons-block">
        {mainBlockItem === "TD_LIST" ? null :
            <div className="buttons-block__mode-btn" onClick={onClickHandler} ><img name="mode" alt="Change MODE " className="buttons-block__btn__img" src={imgSrc} /></div>}
        <div className="buttons-block__to-do-btn" onClick={onClickHandler}><img name="td" alt="ToDo" className="buttons-block__btn__img" src={imgSRcTD} /></div>
        <div className="buttons-block__task-btn" onClick={onClickHandler}><img name="newTask" alt="NEW TASK" className="buttons-block__btn__img" src="./newTask.svg" /></div>
    </div>
}

const mapDispatchToProps = {
    changeMainBlock,
    openWinTask: WinTask
}
const mapStateToProps = (state) => {
    return {
        mainBlockItem: state.render.mainBlockItem
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
