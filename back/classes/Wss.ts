import * as  http from 'http';
import * as  WebSocket from 'ws';
import {response} from './../webChat/types'
import { Observer } from './../wrappers/ObserverWrapper'
import { MessageDistributor, messageDistributor } from './../webChat/MessageHandler/MessageDistributor'

export class Wss implements Observer {

    private wss;
    private server;
    private msgDistribution: MessageDistributor;

    constructor(http, ws, msgDistribution: MessageDistributor) {
        this.msgDistribution = msgDistribution;
        this.server=http.createServer();
        this.initWss(ws);
        this.msgDistribution.registrObserver(this);
    }
    private messageHandler = async (socket: any, message: string): Promise<void> => {
        await this.msgDistribution.handelIncomingMsg(socket, message);
    }

    private closureHandler = async (socket: any): Promise<void> => {
        await this.msgDistribution.handelIncomingMsg(socket, JSON.stringify({ msg:"", roomID: "disconnect", type: "", date: "", loginUser: "" }));
    }

    private connectHandle = (socket, req): void => {
        socket.on('message', this.messageHandler.bind(null, socket));
        socket.on('close', this.closureHandler.bind(null, socket));
    };

    private initWss(ws) {
        this.wss = new ws.Server({ server: this.server ,clientTracking: true });
        this.wss.on('connection', this.connectHandle)
    }
    private sendMessage(socket, obj:response) {
        switch (obj.mode) {
            case "sender":
               
                socket.send(JSON.stringify(obj.data));
                break;
            case "all":
               
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
     
        this.sendMessage(args[0], args[1]);

    }

    getWss(){
        return this.server;
    }

}


export const wss = new Wss(http, WebSocket, messageDistributor);
