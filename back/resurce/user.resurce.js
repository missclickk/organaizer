const Room = require('../models/Room');
const User = require('../models/User');
const { Storage } = require('./../classes/Storage')

class UserResurce {
    #model;
    #roomModel;
    constructor(model, roomModel) {
        this.#model = model;
        this.#roomModel = roomModel
    }
    async getList(roomId) {
        const usersIds = await  Storage.getItemWithConditionally(Room, ["_id"], [roomId], ['users']);
        const ids = usersIds[0].users;
        return await  Storage.getIncludesItems(User, "_id", ids, ['login'])
    }

    async getUser(email) {
        return await  Storage.getItemWithConditionally(User, ['email'], [email], ['password', 'login', 'room']);
    }

    async createUser(email, login, password, room) {
       const user =await new User({ email, login, password });
        await user.save();
        if (room === undefined) {
            const nRoom = new Room({ users: user._id })
            await nRoom.save();
            await  Storage.pushItem(User, { _id: user._id }, 'room', nRoom._id)
            room = nRoom._id;
        }
        else {
            await  Storage.pushItem(User, { _id: user._id }, 'room', room);
            await  Storage.pushItem(Room, { _id: room }, 'users', user._id);
        }
        return { login, room };
    }

    async emailIsExist(email){
        const data=await Storage.getItemWithConditionally(this.#model,["email"],[email])
        return  data.length===0?false:true;
    }
}

module.exports = { userResurce: new UserResurce(User, Room) };