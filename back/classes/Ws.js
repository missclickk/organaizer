const Ws=require('ws');
const { Server } = require('http');
const ws=new Ws.Server({port:4001});

ws.on('connection',async (ws)=>{
    
});


class Ws{
    #ws;
    constructor(port){
        this.#ws=new Ws.Server({port});
    }

}