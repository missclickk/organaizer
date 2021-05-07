const { wss } = require('./Wss')
const { httpServer } = require('./Express')
const {storage}=require('./Storage');
class App {
    #http;
    #ws;
    #storage;
    constructor(http, ws, storage) {
        this.#http = http;
        this.#ws = ws;
        this.#storage = storage;
    }
    async start() {
        if (!await this.#storage.intitStorage()) {
            console.log("error at inint storage!");
            process.exit(1);

        }
        this.#ws.start();
        this.#http.start();
    }

}

module.exports = { App, app: new App(httpServer, wss,storage) }