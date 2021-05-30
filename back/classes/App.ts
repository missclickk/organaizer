
import {server} from './Server'
import {tbot} from './../chatbots/t_bot'
import {IListener} from './IServer'
import {storage} from './Storage';

export class App {
    private listeners:Array<IListener>=[];
    private storage;
    constructor(listeners:Array<IListener>, storage) {
        this.listeners=listeners;
        this.storage = storage;
    }
    async start() {
        if (!await this.storage.intitStorage()) {
            console.log("error at init storage!");
            process.exit(1);
        }
        this.listeners.forEach(e=>e.start());
        
    }

}

export const app=new App( [server,tbot],storage);