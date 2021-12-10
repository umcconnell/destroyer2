import logger from "#helpers/logger";

import * as Rooms from "#models/rooms";
import { RoomInfo, ServerError } from "#models/schemas";

import { heartbeat } from "#helpers/websocket";

import onmessage from "./actions/onmessage.mjs";
import onclose from "./actions/onclose.mjs";
import sendTurn from "./actions/turn.mjs";
import join from "./actions/join.mjs";

export async function addUserToRoom(userId, roomId) {
    try {
        let room = await Rooms.read(roomId);

        if (!room) {
            // Case: Room expired but still available through API
            try {
                await Rooms.untrack(roomId);
            } catch (e) {}
            throw new ServerError(404, "room not found");
        }

        let players = room.players
            .split(",")
            .filter((el) => !!el)
            .filter((el) => el !== userId);

        if (players.length >= 2) throw new ServerError(403, "room full");
        else if (players.includes(userId)) {
            throw new ServerError(403, "player already in room");
        }

        await Rooms.setVal(
            roomId,
            "players",
            players.concat([userId]).join(",")
        );

        let full = players.length + 1 === 2;
        if (full) await Rooms.close(roomId);
    } catch (e) {
        if (e instanceof ServerError) throw e;
        // Catch internal server errors such as problems with the DB
        else throw new ServerError();
    }
}

export async function setupConnection(ws, user, roomId, wss, ROOMS) {
    // Save user info to ws connection object
    ws.userName = user.userName;
    ws.userId = user.userId;
    ws.roomId = roomId;
    ws.isAlive = true;
    ws.placed = false;

    if (ws.roomId in ROOMS) ROOMS[ws.roomId].players.push(ws);
    else ROOMS[ws.roomId] = new RoomInfo(ws);

    const room = ROOMS[ws.roomId];

    // Turn might be reset after gameOver but room still exists
    if (!room.turn) {
        try {
            let turn = await Rooms.getVal(ws.roomId, "turn");
            room.turn = turn ? turn : ws.userId;

            await Rooms.delVal(ws.roomId, "turn");
        } catch (err) {
            logger.error(`Internal Server Error: ${err.stack || err}`);
        }
    }

    sendTurn(null, ws, wss, room);

    join(null, ws, wss, room);

    ws.on("pong", heartbeat);

    ws.on("message", (data, isBinary) => {
        const msg = isBinary ? data.toString : data;
        onmessage(msg, ws, wss, room);
    });

    ws.on("close", () => onclose(null, ws, wss, room, ROOMS));
}
