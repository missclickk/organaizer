import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import "./messageArea.css"


const MessageArea=(props)=>{
    console.log("tt")
    useEffect(()=>{ document.querySelector(".messageArea").value=props.messages
    },[props.messages])
   
    return <textarea  className="messageArea" />
}   

const mapStateToProps=(state)=>{
    return{
        messages:state.chat.messages
    }
};

export default connect(mapStateToProps)(MessageArea);