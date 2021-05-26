"use strict";
exports.__esModule = true;
exports.httpServer = exports.HttpServer = void 0;
var express = require("express");
var api_routes_1 = require("./../routes/api.routes");
var HttpServer = /** @class */ (function () {
    function HttpServer(app, apiRouter) {
        this.PORT = 4000;
        this.server = app;
        this.initServer(apiRouter);
    }
    HttpServer.prototype.initServer = function (apiRouter) {
        this.server.use(express.json({}));
        this.server.use(apiRouter);
    };
    HttpServer.prototype.start = function () {
        this.server.get('/', function (req, res) {
            res.send('hello');
        });
        this.server.listen(this.PORT, function () {
            // console.clear()
            //  console.log('console clear at back/classes/HttpServer.ts at 25 ');
            console.log('Hi, I\'m simple http server!!! ');
        });
    };
    return HttpServer;
}());
exports.HttpServer = HttpServer;
exports.httpServer = new HttpServer(express(), api_routes_1.apiRouter);
