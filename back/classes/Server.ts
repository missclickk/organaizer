import * as  http from 'http';
import {IListener} from './IServer'
import {HttpServer,httpServer} from './HttpServer'
import {Wss,wss} from './Wss'


export class Server implements IListener{
   PORT:number=4000;
    wss:Wss;
    httpServer:HttpServer;
    constructor(http:HttpServer,ws:Wss){
        this.wss=ws;
        this.httpServer=http;
    }

    start() {
    const server=wss.getWss().listen(this.PORT, () => { console.log('Hi, I\'m WebSokcet server!!!') });
      server.on("request",this.httpServer.getServer());
    }
}

 export const server=new Server(httpServer,wss);