const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const app=express();

const PORT=4000;
const MONGO_URI="mongodb+srv://us:123@organizer.x9hju.mongodb.net/<dbname>?retryWrites=true&w=majority"
app.use(express.json({extended:true}))
app.use('/api/users', require('./routes/usersRoutes'))
app.use('/api/task',require('./routes/taskRoutes'))
app.use('/api/todo',require('./routes/todoRoutes'))
app.use('/',express.static(path.join(__dirname,'./../front','build')))



async function start(){
  try{
    await mongoose.connect(MONGO_URI,{
      useNewUrlParser:true,
      useUnifiedTopology:true,
      useCreateIndex:true
    })
  }
  catch(e){ 
    console.log("database connecting error")
    process.exit(1);
  }
}

start();

app.get('/',function(req,res){
  res.send('hello');
})
app.listen(PORT,()=>{
    console.log('ready');
});