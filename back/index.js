const express=require('express');
const fs=require('fs');
const Mongoose=require('mongoose');
const WebSocket=require('ws');
const http=require('http');
const path=require('path');
const {connectHandler}=require('./handlers/wsHandlers')
const {app}=require('./classes/Express')


const PORT=4000;
const MONGO_URI="mongodb+srv://us:123@organizer.x9hju.mongodb.net/<dbname>?retryWrites=true&w=majority"


app.use('/api/users', require('./routes/usersRoutes'))
app.use('/api/task',require('./routes/taskRoutes'))
app.use('/api/todo',require('./routes/todoRoutes'))



async function start(){
  try{
    await Mongoose.connect(MONGO_URI,{
      useNewUrlParser:true,
      useUnifiedTopology:true,
      useCreateIndex:true
    })

    app.get('/',function(req,res){
      res.send('hello');
    })
    app.listen(PORT,()=>{
        console.log('Hi, I\'m simple http server!!! ');
    });
    
  }
  catch(e){ 
    console.log("database connecting error")
    process.exit(1);
  }
}
start();


const server=http.createServer((req,res)=>{
  res.writeHead(200);
  res.end('hello it\'s 40001 port');
});

server.listen(4001,()=>{console.log('Hi, I\'m WebSokcet server!!!')});
const wss=new WebSocket.Server({server,clientTracking:true});

wss.on('connection',connectHandler)