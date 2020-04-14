let WebSocket = require("ws");
let root = require("app-root-path");
let logger = require(`${root}/helpers/logger`);

let Rooms = require(`${root}/models/rooms`);

let { verifyConnection } = require("./controllers/verifyConnection");
let {
    setupConnection,
    addUserToRoom
} = require("./controllers/setupConnection");
let { closeRoom } = require("./controllers/closeRoom");

let { noop, abortHandshake } = require(`${root}/helpers/websocket`);
let { sub } = require(`${root}/db/pubsub`);

// Convenient wrapper
WebSocket.prototype._send = WebSocket.prototype.send;
WebSocket.prototype.send = function (msg) {
    return this._send(JSON.stringify(msg));
};

sub.subscribe("deleteroom");
// Subscribe to expired rooms
if (process.env.AGGRESSIVE_CLEANUP) {
    sub.psubscribe("__keyevent@*__:expired");
}

function main(server) {
    let ROOMS = {};

    let wss = new WebSocket.Server({
        noServer: true,
        path: "/game",
        clientTracking: true
    });

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

    // Cleanup stuff
    const interval = setInterval(function ping() {
        Array.from(wss.clients).forEach((ws) => {
            if (ws.isAlive === false) return ws.terminate();

            ws.isAlive = false;
            ws.ping(noop);
        });
    }, 30000);

    if (process.env.CLEANUP_INTERVAL) {
        const cleanup_interval = setInterval(() => {
            Rooms.openRooms();
        }, process.env.CLEANUP_INTERVAL * 1000 || 60000);
    }

    sub.on("message", function (channel, roomId) {
        if (channel === "deleteroom") closeRoom(null, null, roomId, wss, null);
    });

    if (process.env.AGGRESSIVE_CLEANUP) {
        sub.on("pmessage", function (pattern, channel, roomId) {
            if (pattern === "__keyevent@*__:expired")
                //                    remove room:* prefix
                closeRoom(null, null, roomId.substr(5), wss, null);
        });
    }

    return wss;
}

module.exports = main;
