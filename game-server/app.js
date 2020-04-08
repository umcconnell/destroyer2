let WebSocket = require("ws");
let root = require("app-root-path");
let logger = require(`${root}/helpers/logger`);

let { verifyConnection } = require("./controllers/verifyConnection");
let {
    setupConnection,
    addUserToRoom
} = require("./controllers/setupConnection");

let { noop, abortHandshake } = require(`${root}/helpers/websocket`);
let { messageSchemas } = require(`${root}/models/schemas`);
let { sub } = require(`${root}/db/pubsub`);

// Convenient wrapper
WebSocket.prototype._send = WebSocket.prototype.send;
WebSocket.prototype.send = function (msg) {
    return this._send(JSON.stringify(msg));
};

sub.subscribe("deleteroom");

function main(server) {
    let ROOMS = {};

    let wss = new WebSocket.Server({ noServer: true, path: "/game" });

    server.on("upgrade", async function upgrade(req, socket, head) {
        let user, roomId;
        try {
            let { user: u, roomId: r } = await verifyConnection(
                wss.clients,
                req
            );
            user = u;
            roomId = r;

            await addUserToRoom(user.userId, roomId);
        } catch (err) {
            logger.error(
                `WebSocket Error ${err.status || ""}${
                    err.message ? " : " + err.message : ""
                }`
            );

            return abortHandshake(socket, err.status, err.message);
        }

        wss.handleUpgrade(req, socket, head, function done(ws) {
            wss.emit("connection", ws, user, roomId);
        });
    });

    wss.on("connection", function connection(ws, user, roomId) {
        return setupConnection(ws, user, roomId, wss, ROOMS);
    });

    const interval = setInterval(function ping() {
        Array.from(wss.clients).forEach((ws) => {
            if (ws.isAlive === false) return ws.terminate();

            ws.isAlive = false;
            ws.ping(noop);
        });
    }, 30000);

    sub.on("message", function (channel, roomId) {
        if (channel === "deleteroom")
            Array.from(wss.clients).forEach((client) => {
                if (client.roomId === roomId) {
                    client.send(messageSchemas("kick", "owner closed room"));
                    return client.terminate();
                }
            });
    });

    return wss;
}

module.exports = main;
