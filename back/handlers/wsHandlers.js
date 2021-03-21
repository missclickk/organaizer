const { getItemByID } = require('./dbRequetHandler')
const Room = require('./../models/Room')
const { ChatCache } = require('./../classes/ChatCache')
const cache = ChatCache();

///each and push
const messageHandler = async (socket, message) => {
    const { msg, roomID, type, date, loginUser } = JSON.parse(message);
    switch (type) {
        case 'reg':
            socket.id = Date.now();
            socket.roomID = roomID;
            cache.removeTimerIfExisit(roomID);
            cache.regClient(socket, roomID);
            const room = cache.getRoomData(roomID);
            const { chat } = await getItemByID(Room, roomID, ['chat'])
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


module.exports = { connectHandler };