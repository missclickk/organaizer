const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const moment = require('moment');

const Task = require('../models/Task');
const Room = require('../models/Room');
const { getItemByID, addItem,deleteItem } = require('./../handlers/dbRequetHandler');
const { firstDateAreGreater} = require('./../handlers/dateHandlers')
const { getTasks } = require('./../handlers/tasksHandlers');

const router = Router();

router.post('/oneTask',
  [check('task.title', 'Пустое поле "Название"').isLength({ min: 1 })],
  check('task.date', 'Вы не указали дату').isLength({ min: 1 }),
  check('task.time', 'Вы не указали время').isLength({ min: 1 }),
  check('task.date').custom((value, { req }) => {
    if (firstDateAreGreater(moment(req.body.currentTime), moment(value)))
      throw new Error('Некоректная дата')
    return true;

  }),
  check('task.users').custom((value) => {
    let flag = false;
    for (user in value) {
      if (value[user] === true) {
        flag = true;
        break;
      }
    }
    if (flag === false)
      throw new Error('Вы не указали пользователей')
    return true;

  })
  , async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array() })

    const { task, room } = req.body;
 
    if (await addItem(Task, { ...task, room }))
      res.status(200).json({ message: 'task created' });
    else res.status(400).json({ message: ["task don't added"] });
  })

router.get('/oneTask', async (req, res) => {
  const id = req.headers.id;
  const task = await getItemByID(Task, id, ['_id', 'title', 'time', 'period', 'description']);
  if (!task)
    res.status(404).json({ error: "задание не найдено" });
  res.status(200).json(task);
})

router.delete('/oneTask',async(req,res)=>{
  try {
    await deleteItem(Task, "_id", req.headers.target);
    res.status(200).json({ message: 'delete sucseeful' })
}
catch (e) {
    res.status(400).json({ error: 'bad request' })
}
})

router.get('/TasksForRange', async (req, res) => {
  try {
    
    const { room, login, mode, _date } = req.headers;
    const tasks = await getTasks(mode, moment(_date), login, room);
    return res.status(200).json({ tasks });
  }
  catch (e) {
    console.log(e)
    return res.status(400).json({ tasks: [] });
  }
})




module.exports = router;