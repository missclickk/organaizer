"use strict";
exports.__esModule = true;
exports.apiRouter = exports.ApiRouter = void 0;
var express = require("express");
var express_1 = require("express");
var path = require("path");
var todo_router_1 = require("./todo.router");
var task_routes_1 = require("./task.routes");
var user_routes_1 = require("./user.routes");
var ApiRouter = /** @class */ (function () {
    function ApiRouter(router, routes) {
        this.router = router;
        this.routes = routes;
        this.setupApiRoutes();
    }
    ApiRouter.prototype.getApiRouter = function () {
        return this.router;
    };
    ApiRouter.prototype.addApiRouter = function (url, router) {
        this.router.use(url, router);
    };
    ;
    ApiRouter.prototype.setupApiRoutes = function () {
        var _this = this;
        this.routes.forEach(function (route) {
            _this.addApiRouter(route.url, route.router);
        });
    };
    ;
    return ApiRouter;
}());
exports.ApiRouter = ApiRouter;
var routes = [
    { url: '/api/users', router: user_routes_1.userRouter },
    { url: '/api/task', router: task_routes_1.taskRouter },
    { url: '/api/todo', router: todo_router_1.todoRouter },
    { url: '/', router: express.static(path.join(__dirname, './../front', 'build')) },
];
exports.apiRouter = new ApiRouter(express_1.Router(), routes).getApiRouter();
