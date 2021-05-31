import React from 'react'
import './messageArea.css'

const Message=({hour,minute,msg,login})=>{

return <div className="message-area__msg-wrapper">
            <div  className="message-area__msg-wrapper__header">
                    {   hour===""?``:`${login} в  ${hour}.${minute}:   `}
            </div>           
            <div className="message-area__msg-wrapper__msg">
                {msg}  
            </div>
</div> 
}


export default Message;


