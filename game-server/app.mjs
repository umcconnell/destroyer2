import WebSocket, { WebSocketServer } from "ws";
import logger from "#helpers/logger";

import { getOpenRooms } from "#models/rooms";

import { verifyConnection } from "#game-server/controllers/verifyConnection";
import {
    setupConnection,
    addUserToRoom
} from "#game-server/controllers/setupConnection";
import { closeRoom } from "#game-server/controllers/closeRoom";

import { noop, abortHandshake } from "#helpers/websocket";
import { toBool } from "#helpers/utils";
import { sub } from "#db/pubsub";

// Convenient wrapper
WebSocket.prototype._send = WebSocket.prototype.send;
WebSocket.prototype.send = function (msg) {
    return this._send(JSON.stringify(msg));
};

function main(server) {
    let ROOMS = {};

    let wss = new WebSocketServer({
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
            getOpenRooms();
        }, process.env.CLEANUP_INTERVAL * 1000 || 60000);
    }

    sub.subscribe("deleteroom", (roomId) => {
        logger.debug(`Got redis 'deleteroom' message for ${roomId}`);
        closeRoom(null, null, roomId, wss, null);
    });

    // Subscribe to expired rooms
    if (toBool(process.env.AGGRESSIVE_CLEANUP)) {
        sub.pSubscribe("__keyevent@*__:expired", (channel, roomId) => {
            if (channel === "__keyevent@*__:expired")
                //                    remove room:* prefix
                closeRoom(null, null, roomId.substr(5), wss, null);
        });
    }

    return wss;
}

export default main;
