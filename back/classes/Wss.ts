import * as  http from 'http';
import * as  WebSocket from 'ws';
import {response} from './../webChat/types'
import { Observer } from './../wrappers/ObserverWrapper'
import { IListener } from './IServer'
import { MessageDistributor, messageDistributor } from './../webChat/MessageHandler/MessageDistributor'

export class Wss implements IListener, Observer {

    private wss;
    private server;
    private msgDistribution: MessageDistributor;

    constructor(http, ws, msgDistribution: MessageDistributor) {
        this.msgDistribution = msgDistribution;
        this.initHttpServer(http);
        this.initWss(ws);
        this.msgDistribution.registrObserver(this);
    }

    private messageHandler = async (socket: any, message: string): Promise<void> => {
      //  console.log(3);
        await this.msgDistribution.handelIncomingMsg(socket, message);
    }

    private closureHandler = async (socket: any): Promise<void> => {
        await this.msgDistribution.handelIncomingMsg(socket, JSON.stringify({ msg:"", roomID: "disconnect", type: "", date: "", loginUser: "" }));
    }

    private connectHandle = (socket, req): void => {
        socket.on('message', this.messageHandler.bind(null, socket));
        socket.on('close', this.closureHandler.bind(null, socket));
    };

    private initHttpServer(http) {
        this.server = http.createServer((req, res) => {
            res.writeHead(200);
            res.end('hello it\'s 40001 port');
        });
    }

    private initWss(ws) {
        this.wss = new ws.Server({ server: this.server, clientTracking: true });
    }

    private sendMessage(socket, obj:response) {
        switch (obj.mode) {
            case "sender":
                console.log(1.1)
                socket.send(JSON.stringify(obj.data));
                break;
            case "all":
                console.log(2.1)
                obj.data.clients.forEach(e => {
                    e.send(JSON.stringify({ type: obj.data.type, message: obj.data.message }))
                });
                break;
            default:
                console.log("error")
                break;
        }
    }


    update(args: Array<any>) {
        console.log(1.2)
        this.sendMessage(args[0], args[1]);

    }
    start() {
        this.server.listen(8081, () => { console.log('Hi, I\'m WebSokcet server!!!') });
        this.wss.on('connection', this.connectHandle)
    }
}


export const wss = new Wss(http, WebSocket, messageDistributor);
