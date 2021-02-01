import React from "react"
import {connect} from 'react-redux'
import "./writeArea.css"
import {addMessage} from "./../../../../../redux/actions"
const WriteArea=(props)=>{


const onClickHandler=()=>{
   props.addMessage(document.querySelector(".write-area__input-text").value);
}

    return <div className="write-area">
        <textarea className="write-area__input-text"></textarea>
        <div className="write-area__send-button"  ><img alt="Отправить" onClick={onClickHandler} src="./sendImg.png" className="write-area__send-button__img"/></div>
        </div>
}

const mapDispatchToProps={
    addMessage
}
export default connect(null,mapDispatchToProps)(WriteArea);