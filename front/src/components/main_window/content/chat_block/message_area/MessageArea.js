import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import "./messageArea.css"
import  Message from './Message'

const MessageArea=({messages})=>{
    useEffect(()=>{ document.querySelector(".message-area").value=messages
    },[messages])




    return <div className="message-area" >
        { messages.map((e,i)=><Message key={i} login={e.loginUser} hour={e.hour} minute={e.minute} msg={e.msg}/>)}
    </div>
}   

const mapStateToProps=(state)=>{
    return{
        messages:state.chat.messages
    }
};

export default connect(mapStateToProps)(MessageArea);