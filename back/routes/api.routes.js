const express = require('express');
const { Router } = require('express')
const path = require('path');
const { todoRouter } = require('./todo.routes')
const { taskRouter } = require('./task.routes')
const {  userRouter } = require('./user.routes')
class ApiRouter {
    #router;
    #routes;
    constructor(router, routes) {
        this.#router = router();
        this.#routes = routes;
        this.#setupApiRoutes();
    }
    get apiRouter() {
        return this.#router;
    }
    #addApiRouter(url, router) {
        this.#router.use(url, router);
    };

    #setupApiRoutes() {
        this.#routes.forEach(route => {
            this.#addApiRouter(route.url, route.router);
        });
    };
}
const routes = [
    { url: '/api/users', router: userRouter },
    { url: '/api/task', router: taskRouter },
    { url: '/api/todo', router: todoRouter },
    { url: '/', router: express.static(path.join(__dirname, './../front', 'build')) },

];

module.exports = {
    ApiRouter,
    apiRouter: new ApiRouter(Router, routes).apiRouter,
}