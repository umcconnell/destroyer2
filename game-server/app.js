let WebSocket = require("ws");
let url = require("url");

let verifiyConnection = require("./controllers/verifyConnection");
let setupConnection = require("./controllers/setupConnection");

let { noop } = require("../helpers/websocket");
let { messageSchemas } = require("../models/schemas");
let { sub } = require("../db/pubsub");

// Convenient wrapper
WebSocket.prototype._send = WebSocket.prototype.send;
WebSocket.prototype.send = function(msg) {
    return this._send(JSON.stringify(msg));
};

sub.subscribe("deleteroom");

function main(expressServer) {
    let ROOMS = {};
    let wss = new WebSocket.Server({
        server: expressServer,
        path: "/game",
        verifyClient: ({ req }, cb) => {
            let { query } = url.parse(req.url, true);

            return verifiyConnection(wss.clients, query, cb);
        }
    });

    wss.on("connection", function(ws, req) {
        let { query: params } = url.parse(req.url, true);

        return setupConnection(ws, params, wss, ROOMS);
    });

    const interval = setInterval(function ping() {
        Array.from(wss.clients).forEach(function(ws) {
            if (ws.isAlive === false) return ws.terminate();

            ws.isAlive = false;
            ws.ping(noop);
        });
    }, 30000);

    sub.on("message", function(channel, roomId) {
        if (channel === "deleteroom")
            Array.from(wss.clients).forEach(client => {
                if (client.roomId === roomId) {
                    client.send(messageSchemas("kick", "owner closed room"));
                    return client.terminate();
                }
            });
    });

    return wss;
}

module.exports = main;
