 class SocketHandler{
    #ws
    constructor(){
        this.#ws=new WebSocket('ws://localhost:4001');
    }
      listenConnection(callback){
        this.#ws.onmessage=(response)=>{
                    const res=JSON.parse(response.data).message;
                callback(res);
                    }
    }
    sendMessage(val){
        const message=JSON.stringify({...val});
        this.#ws.send(message);
    }   
}
 export const  socketHandler=new SocketHandler();