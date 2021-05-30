"use strict";
exports.__esModule = true;
exports.httpServer = exports.HttpServer = void 0;
var express = require("express");
var api_router_1 = require("./../routes/api.router");
var HttpServer = /** @class */ (function () {
    function HttpServer(app, apiRouter) {
        this.server = app;
        this.initServer(apiRouter);
    }
    HttpServer.prototype.getServer = function () {
        return this.server;
    };
    HttpServer.prototype.initServer = function (apiRouter) {
        this.server.use(express.json({}));
        this.server.use(apiRouter);
    };
    return HttpServer;
}());
exports.HttpServer = HttpServer;
exports.httpServer = new HttpServer(express(), api_router_1.apiRouter);
