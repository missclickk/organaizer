const express=require('express');
const path=require('path');
class ExpressServer{
    #express;
    constructor(){
        this.#express=express();
        this.initStaticPage();
    }
    initStaticPage(){
        this.#express.use(express.json({extended:true}));
        this.#express.use('/',express.static(path.join(__dirname,'./../front','build')));
    }
    get app(){
        return this.#express;
    }
}


module.exports={app:new ExpressServer().app};