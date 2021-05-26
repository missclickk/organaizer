import * as express from 'express';
import * as path from 'path';
import {IListener} from "./IServer"
import {apiRouter,ApiRouter} from './../routes/api.routes'


export class HttpServer implements IListener{
    private server;
    private PORT:number=4000; 
    constructor(app,apiRouter){
        this.server=app;
        this.initServer(apiRouter);
    }

    private initServer(apiRouter):void{
        this.server.use(express.json({}));
        this.server.use(apiRouter);
    }
    start():void{
        this.server.get('/',function(req,res){
            res.send('hello');
          })
         this.server.listen(this.PORT,()=>{
              console.log('Hi, I\'m simple http server!!! ');
          });
    }

}


export const  httpServer=new HttpServer(express(),apiRouter);