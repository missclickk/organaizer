"use strict";
exports.__esModule = true;
exports.server = exports.Server = void 0;
var HttpServer_1 = require("./HttpServer");
var Wss_1 = require("./Wss");
var Server = /** @class */ (function () {
    function Server(http, ws) {
        this.PORT = 4000;
        this.wss = ws;
        this.httpServer = http;
    }
    Server.prototype.start = function () {
        var server = Wss_1.wss.getWss().listen(this.PORT, function () { console.log('Hi, I\'m WebSokcet server!!!'); });
        server.on("request", this.httpServer.getServer());
    };
    return Server;
}());
exports.Server = Server;
exports.server = new Server(HttpServer_1.httpServer, Wss_1.wss);
