import React from "react"
import {connect} from 'react-redux'
import "./writeArea.css"
import {addMessage,typing} from "./../../../../../redux/actions"


const WriteArea=({date,writeVal,roomID,loginUser,socket,typing,addMessage})=>{

    const onClickHandler=()=>{
   addMessage(socket,{msg:writeVal,roomID,loginUser,date});
}

const typingHandler=(event)=>{
    typing(event.target.value,'CHAT');    
}

    return <div className="write-area">
        <textarea className="write-area__input-text"value={writeVal}  onChange={typingHandler}></textarea>
        <div className="write-area__send-button"  ><img alt="Отправить" onClick={onClickHandler} src="./sendImg.png" className="write-area__send-button__img"/></div>
        </div>
}

const mapStateToProps=(state)=>({
    writeVal:state.chat.writeVal,
    roomID:state.user.roomID,
    loginUser:state.user.loginUser,
    socket:state.socket.socket,
    date:state.date.date,
})

const mapDispatchToProps={
    addMessage,
    typing
}
export default connect(mapStateToProps,mapDispatchToProps)(WriteArea);