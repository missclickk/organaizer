const express=require('express');
    class ApiRouter{
    #router;
    #routes=[
        {url:'./api/task',router:taskRoutes},
        {url:'./api/todo',router:userRoutes},
        {url:'./api/user',router:todoRoutes},
];
    constructor(router){
        this.#router=router;
        this.#setupApiRoutes();
    }
    get apiRouter(){
        return this.#router;
    }

    #addApiRouter(url,router){
        this.#router.use(url,router);

    };

    #setupApiRoutes(){
        this.#routes.forEach(route=> {
            this.#addApiRouter(route.url,route.router);            
        });

    };

}

module.exports={
    ApiRouter,
}


module.exports={
    ApiRouter,
    apiRouter:new ApiRouter(express(),routes).apiRouter,
}