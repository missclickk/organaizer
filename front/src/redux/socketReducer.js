
import {SOCKET_INIT} from './types'
const CHAT_MSG="chat_msg";

const initialState={
    socket:undefined,
    chatMsgHandler:()=>{}
}

export const socketReducer=(state=initialState,action)=>{
    switch(action.type){
        case SOCKET_INIT:
            const newScoket=new WebSocket('ws://localhost:4000');
            newScoket.onopen=()=>newScoket.send(JSON.stringify({type:'reg',roomID:action.roomId}));
            newScoket.onmessage=(response)=>{
                const   {type,message}=JSON.parse(response.data);
                switch(type){
                case CHAT_MSG:
                    console.log(message);
                    action.payload(message);
                    default:
                    break;
                }
            }
            return {...state,socket:newScoket}
        



        default: return {...state};
        
    }
    

}