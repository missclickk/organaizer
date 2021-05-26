import { wss } from './Wss';
import { httpServer} from './HttpServer';
import {tbot} from './../chatbots/t_bot'
import {IListener} from './IServer'
import {storage} from './Storage';

export class App {
    private arrayListeners:Array<IListener>=[];
    private storage;
    constructor(listeners:Array<IListener>, storage) {
        this.arrayListeners=listeners;
        this.storage = storage;
    }
    async start() {
        if (!await this.storage.intitStorage()) {
            console.log("error at init storage!");
            process.exit(1);
        }
        this.arrayListeners.forEach(e=>e.start());
        
    }

}

export const app=new App( [httpServer,wss,tbot],storage);