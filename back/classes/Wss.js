const { Storage} = require('./Storage')
const Room = require('./../models/Room')
const { ChatCache } = require('./../classes/ChatCache')
const cache = ChatCache();
const WebSocket=require('ws');
const http=require('http');





const messageHandler = async (socket, message) => {
    const { msg, roomID, type, date, loginUser } = JSON.parse(message);
    switch (type) {
        case 'reg':
            socket.id = Date.now();
            socket.roomID = roomID;
            cache.removeTimerIfExisit(roomID);
            cache.regClient(socket, roomID);
            const room = cache.getRoomData(roomID);
            const { chat } = await Storage.getItemByID(Room, roomID, ['chat'])
            const text = room.msg && chat ? room.msg.concat(chat) : room.msg || chat;
            if (text)
                socket.send(JSON.stringify({ type: 'chat_msg', data: text }));
            break;
        case 'msg':
            cache.addMessage({ date, loginUser, msg }, roomID);
            const roomCache = cache(roomID);
            const message = JSON.stringify({ type: 'chat_msg', data: [{ date, loginUser, msg }] });
            roomCache.clients.forEach(e => {
                if (e.id !== socket.id)
                    e.send(message);
            });
            break;
        default:    
            break;
    }
}


const closureHandler = (socket, code) => {
    //   console.log(socket.id);
    cache.deleteClient(socket.id);
}



const connectHandler = (socket, req) => {
        socket.on('message', messageHandler.bind(null, socket));
        socket.on('close', closureHandler.bind(null, socket));
}


class Wss{
    #wss;
    #connectHandler;
    #server;
        constructor(http,ws,handler){
            this.#initHttpServer(http);
            this.#initWss(ws);
            this. #connectHandler=handler;
        }
        #initHttpServer(http){  
            this.#server=http.createServer((req,res)=>{
                res.writeHead(200);
                res.end('hello it\'s 40001 port');
              });
        }
        #initWss(ws){
              this.#wss=new ws.Server({server:this.#server,clientTracking:true});
        }
    start(){
        this.#server.listen(4001,()=>{console.log('Hi, I\'m WebSokcet server!!!')});
        this.#wss.on('connection',this.#connectHandler)
    }        
}




module.exports={Wss,wss:new Wss(http,WebSocket,connectHandler)};
