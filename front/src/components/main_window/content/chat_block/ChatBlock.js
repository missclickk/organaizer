import React,{useEffect,useState} from 'react'
import  "../content.css"
import {connect} from 'react-redux'
import MessageArea from "./message_area/MessageArea"
import WriteArea from "./write_area/WriteArea"
import { handleIncomingMessage,socketInit} from '../../../../redux/actions'
const ChatBlock=({ handleIncomingMessage,socketInit,roomId,socket})=>{
  const [isFirstRender,setIsFirstRender]=useState(true)  
      
  useEffect(()=>{
    if(isFirstRender)
    {
      socketInit(roomId,handleIncomingMessage);
      setIsFirstRender(false);
    }
  },[isFirstRender,socketInit,handleIncomingMessage,roomId])



 return <div className='content__chat'>
          <MessageArea/> 
          <WriteArea/>
        </div>
}


const mapStateToProps=(state)=>({
  socket:state.socket.socket,
  roomId:state.user.roomID,
})

const mapDispatchToProps={
  socketInit,
  handleIncomingMessage
}

export default connect(mapStateToProps,mapDispatchToProps)(ChatBlock);
