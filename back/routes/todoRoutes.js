const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const Todo = require('./../models/Todo')
const Room = require('./../models/Room')
const {getItemWithConditionally, getItemWithOrConditionally ,addItem, pushItem, setItem, deleteItem } = require('./../handlers/dbRequetHandler')
const router = Router();


router.post('/lists',
        [
                check('todo.title', 'НАЗВАНИЕ ДОЛЖНО СОДРЕРЖАТЬ ОТ 1 ДО 20 СИМВОЛОВ ').isLength({ min: 1, max: 20 }),
                check('todo.users').custom((value) => {
                        for (user in value)
                                if (value[user] === true)
                                        return true;
                        throw new Error('Вы не указали пользователей')
                })
        ], async (req, res) => {
                try {
                        const errors = validationResult(req);
                        if (!errors.isEmpty()) {
                                return res.status(400).json({ message: errors.array().map(e => e.msg) })
                        }
                        const { todo, room } = req.body;
                        let obj;
                        if (obj = await addItem(Todo, { ...todo, room }, true)) {
                                await pushItem(Room, { _id: room }, 'todos', obj._id);
                                return res.status(200).json({ message: "list created" });
                        }
                        else
                                res.status(400).json({ message: ["список не создан"] })

                }
                catch (e) {
                        console.log(e);
                        res.status(400).json({ message: ["что то пошло не так"] })
                }
        })


router.get('/lists', async (req, res) => {
        try {
                const user = req.headers.user;
                const room = req.headers.room;
                const filds=[`users.${user}`,'room'];
                const fildsVal=[{ '$exists' : false },room];
                const filds1=[`users.${user}`,'room'];
                const fildsVal1=[ true,room];
                const items = await  getItemWithOrConditionally(Todo,filds,fildsVal,filds1,fildsVal1, ['_id', 'title', 'tasks']);
                if (!items)
                     return   res.status(400).json({ error: 'списки не найдены' })
                let obj = {};
                items.forEach(e => {
                        obj[e._id] = { title: e.title, tasks: e.tasks }
                });
              return  res.status(200).json({ todo: obj });
        }
        catch (e) {
                console.log(e);
               // res.status(400).json({ error: 'bad request' })
        }
})


router.delete('/lists', async (req, res) => {
        try {

                await deleteItem(Todo, "_id", req.headers.target);
                res.status(200).json({ message: 'delete sucseeful' })
        }
        catch (e) {
                res.status(400).json({ error: 'bad request' })
        }
})

router.post('/task', [check('task', 'НАЗВАНИЕ ДОЛЖНО СОДЕРЖАТЬ ОТ 1').isLength({ min: 1 }),], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
                return res.status(400).json({ message: errors.array().map(e => e.msg) });
        try {
                const { id, task } = req.body;

                await pushItem(Todo, { _id: id }, 'tasks', { name: task, value: true });
                res.status(200).json({ message: "todo task created!" });
        }
        catch (e) {
                return res.status(400).json({ message: "что-то пошло не так!!!" });
        }
})
router.patch('/task', async (req, res) => {
        try {
                const { id, task, value } = req.body;

                if (await setItem(Todo, { _id: id, 'tasks.name': task }, 'tasks.$.value', !value));

                res.status(200).json({ message: 'успешно обновлено' });
        }


        catch (e) {
                console.log(e);
                res.status(400).json({ message: "что-то пошло не так!" })
        }

});
module.exports = router;