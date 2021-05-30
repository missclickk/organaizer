import * as express from 'express';
import { Router } from 'express'
import *  as path from 'path';
import { todoRouter } from './todo.router'
import { taskRouter } from './task.routes'
import {  userRouter } from './user.routes'

type Routes={
    url:string;
    router:Router;
}


export class ApiRouter {
    private router:Router;
    private routes;
    constructor(router:Router, routes) {
        this.router = router;
        this.routes = routes;
        this.setupApiRoutes();
    }
    getApiRouter():Router {
        return this.router;
    }
    addApiRouter(url:string, router:Router):void {
        this.router.use(url, router);
    };

    setupApiRoutes():void {
        this.routes.forEach(route => {
            this.addApiRouter(route.url, route.router);
        });
    };
}

const routes:Routes[] = [
    { url: '/api/users', router: userRouter },
    { url: '/api/task', router: taskRouter },
    { url: '/api/todo', router: todoRouter },
    { url: '/', router: express.static(path.join(__dirname, './../front', 'build')) },

];



export const  apiRouter=new ApiRouter(Router(), routes).getApiRouter();