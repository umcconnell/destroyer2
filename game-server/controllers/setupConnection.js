let root = require("app-root-path");
let logger = require(`${root}/helpers/logger`);

let Rooms = require(`${root}/models/rooms`);
let { roomInfo, ServerError } = require(`${root}/models/schemas`);

let { heartbeat } = require(`${root}/helpers/websocket`);

let onmessage = require("./actions/onmessage");
let onclose = require("./actions/onclose");
let sendTurn = require("./actions/turn");
let join = require("./actions/join");

exports.addUserToRoom = async function addUserToRoom(userId, roomId) {
    try {
        let room = await Rooms.get(roomId);
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

        await Rooms.update(
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
};

exports.setupConnection = async function setupConnection(
    ws,
    user,
    roomId,
    wss,
    ROOMS
) {
    // Save user info to ws connection object
    ws.userName = user.userName;
    ws.userId = user.userId;
    ws.roomId = roomId;
    ws.isAlive = true;
    ws.placed = false;

    if (ws.roomId in ROOMS) ROOMS[ws.roomId].players.push(ws);
    else ROOMS[ws.roomId] = new roomInfo(ws);

    const room = ROOMS[ws.roomId];

    // Turn might be reset after gameOver but room still exists
    if (!room.turn) {
        try {
            turn = await Rooms.getVal(ws.roomId, "turn");
            room.turn = turn ? turn : ws.userId;

            await Rooms.delVal(ws.roomId, "turn");
        } catch (e) {
            logger.error(`Internal Server Error: ${err.stack || err}`);
        }
    }

    sendTurn(null, ws, wss, room);

    join(null, ws, wss, room);

    ws.on("pong", heartbeat);

    ws.on("message", (msg) => onmessage(msg, ws, wss, room));

    ws.on("close", () => onclose(null, ws, wss, room, ROOMS));
};
