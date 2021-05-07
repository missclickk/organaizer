const express=require('express');
    class ApiRouter{
    #router;
    #routes;
    constructor(router,routes){
        this.#router=router;
        this.#routes=routes;
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
const routes=[
        {url:'./api/task',router:taskRoutes},
        {url:'./api/todo',router:userRoutes},
        {url:'./api/user',router:todoRoutes},
]



module.exports={
    apiRouter:new ApiRouter(express(),routes).apiRouter
}