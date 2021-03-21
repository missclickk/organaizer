import { regUser } from './actions';
import {SOCKET_INIT} from './types'
const CHAT_MSG="chat_msg";

const initialState={
    socket:undefined,
    chatMsgHandler:()=>{}
}




export const socketReducer=(state=initialState,action)=>{
    switch(action.type){
        case SOCKET_INIT:
            const newScoket=new WebSocket('ws://localhost:4001');
            newScoket.onopen=()=>newScoket.send(JSON.stringify({type:'reg',roomID:action.roomId}));
            newScoket.onmessage=(response)=>{
                const   {type,data}=JSON.parse(response.data);
                switch(type){
                case CHAT_MSG:
                    action.payload(data)
                    default:
                    break;
                }
            }
            return {...state,socket:newScoket}
        



        default:
        return {...state};
    }
    

}