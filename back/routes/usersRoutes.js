const { Router } = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const Room = require('../models/Room');
const User = require('../models/User');

const { getItemWithConditionally, pushItem, getIncludesItems } = require('../handlers/dbRequetHandler');



const router = Router();

router.post(
    '/registr',
    [check('email', 'Некоректный email').isEmail(),
    check('password', 'Пароль должен содержать от 6 до 20 символов').isLength({ min: 6, max: 20 }),
    check('password').custom((value, { req }) => {
        if (value != req.body.rPassword)
            throw new Error('Пароли не совподают')
        return true;
    })
    ]
    , async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array().map(e => e.msg) })
        }
        try {

            let { email, login, password, room } = req.body;
            const candidate = await User.findOne().or([{ email }, { login }]);//убрать отсюда
            if (candidate) {
                return res.status(400).json({ message: [' email или логи  уже занят'] });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            let user;
            if (room === undefined) {
                user = new User({ email, login, password: hashedPassword });
                await user.save();
                const nRoom = new Room({ users: user._id })
                await nRoom.save();
                await pushItem(User, { _id: user._id }, 'room', nRoom._id)
                await user.save();
                room = nRoom._id;
            }
            else {
                user = new User({ email, login, password: hashedPassword });
                await user.save();
                await pushItem(User, { _id: user._id }, 'room', room);
                await pushItem(Room, { _id: room }, 'users', user._id);
                await user.save();
            }
            res.status(200).json({ room, login });
        }
        catch (e) {
            console.log(e);
        }



    })



router.post('/auth', [check('email', 'НЕ КОРЕКТНЫЙ EMAIL').isEmail()], async (req, res) => {
    const errors = validationResult(req);
    console.log(req);
    if (!errors.isEmpty())
    {
      
        return res.status(400).json({ message: errors.array().map(e => e.msg) });
    }

        const { email, password } = req.body;
    try {
        const buf = await getItemWithConditionally(User, ['email'], [email],['password', 'login', 'room']);
        if (!buf)
            throw new Error('email не найден');
      
            const obj = buf[0];
        if (await bcrypt.compare(password, obj.password)) {
            return res.status(200).json({ login: obj.login, room: obj.room });

        }
        else   throw new Error('bad request');
        
    }
    catch (e) {
        console.log(e)
        return res.status(400).json({ message: [e] });
    }
})


router.get('/list', async (req, res) => {
    try {
        const roomId = req.headers.room;
        const usersIds = await getItemWithConditionally(Room, ["_id"], [roomId], ['users']);
        const ids = usersIds[0].users;
        const users = await getIncludesItems(User, "_id", ids, ['login'])
        if (users.length !== 0)
          return  res.status(200).json({ logins: users.map(e => e.login) })
       throw new Error('bad request');
    }
    catch (e) {

        console.log(e);
        res.status(400).json({ message: ["хуйня какая-то"] })
    }
})

module.exports = router;