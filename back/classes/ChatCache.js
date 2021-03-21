const { pushItem, getItemByID } = require('./../handlers/dbRequetHandler')
const Room = require('./../models/Room')


const ChatCache = function () {
    const cache = {};
    const timerList = {};

    const filterOutEmptyElements = obj => obj.filter(e => e !== undefined);
  
    const saveDataAtStorage = async (roomID) => {
        console.log(roomID);
        if (cache[roomID].msg)
            await pushItem(Room, { "_id": roomID }, "chat", cache[roomID].msg);

    }
    const removeRoom = roomID => delete cache[roomID];
    const removeRoomAndSaveData = async (roomID) => {
        await saveDataAtStorage(roomID);
        removeRoom(roomID);
    }
    const setTimerForDeletingRoom = (room) => timerList[room] = setTimeout(removeRoomAndSaveData.bind(null, room), 300);
    const normolizeCacheState = (room) => {
        cache[room].clients = filterOutEmptyElements(cache[room].clients);
        if (cache[room].clients.length === 0)
            setTimerForDeletingRoom(room);
    }
    const deleteClientFromCache = (clientIndex, room) => {
        delete cache[room].clients[clientIndex];
        normolizeCacheState(room);
    }

    function cacheFun(roomID) {
        return cache[roomID];
    }
    cacheFun.removeTimerIfExisit = function (roomID) {
        clearTimeout(timerList[roomID]);
        delete timerList[roomID];
    }
    cacheFun.deleteTimer = function (roomID) {
        clearTimeout(timoutList[roomID]);
    }

    cacheFun.addMessage = function (msg, roomID) {
           cache[roomID].msg? cache[roomID].msg.push(msg): cache[roomID].msg = [msg];
    }


    cacheFun.regClient = function (socket, roomID) {
        if (cache[roomID])
            cache[roomID].clients.push(socket);
        else cache[roomID] = { clients: [socket] };

    }
    cacheFun.getRoomData = function (roomID) {
        return cache[roomID];
    }
    cacheFun.deleteClient = function (clientID) {
        for (const room in cache) {
            const clientIndex = cache[room].clients.findIndex(e => { if (e != undefined) return e.id === clientID });
            if (clientIndex !== -1)
                deleteClientFromCache(clientIndex, room);
        }
    }

    return cacheFun;
}


module.exports={ChatCache}