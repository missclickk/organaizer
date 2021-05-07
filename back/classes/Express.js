const express=require('express');
const path=require('path');

const {apiRouter}=require('./../routes/api.routes');
class HttpServer{
    #server;
    #PORT=4000;
    constructor(app,apiRouter){
        this.#server=app;
        this.#initServer(apiRouter);
    }


    #initServer(){

        this.#server.use(express.json({extended:true}));
        this.#server.use(apiRouter);
    }

    start(){
        this.#server.get('/',function(req,res){
            res.send('hello');
          })
         this.#server.listen(this.#PORT,()=>{
              console.log('Hi, I\'m simple http server!!! ');
          });
    }
   // get httpServer(){
   //     return this.#server;
   // }
}


module.exports={httpServer:new HttpServer(express(),apiRouter)};