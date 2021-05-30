import * as express from 'express';

import {apiRouter} from './../routes/api.router'


export class HttpServer {
    private server;
    constructor(app,apiRouter){
        this.server=app;
        this.initServer(apiRouter);
    }
    getServer(){
        return this.server;
    }
    private initServer(apiRouter):void{
        this.server.use(express.json({}));
        this.server.use(apiRouter);
    }

}


export const  httpServer=new HttpServer(express(),apiRouter);