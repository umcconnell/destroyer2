let logger = require("@helpers/logger");

let Rooms = require("@models/rooms");
let { ServerError, messageSchemas } = require("@models/schemas");

async function closeWs(playerId, roomId) {
    let room = await Rooms.get(roomId);

    if (!room) throw new ServerError(404, "room not found");

    // Remove empty fields (e.g "".split(",") => [""])
    let players = room.players.split(",").filter((el) => !!el);

    let newPlayers = players.filter((id) => id !== playerId);
    await Rooms.update(roomId, "players", newPlayers.join(","));

    if (newPlayers.length < 2) Rooms.open(roomId);
}

async function onclose(msg, ws, wss, room, ROOMS) {
    try {
        await closeWs(ws.userId, ws.roomId);

        let newPlayers = room.players.filter(
            (player) => player.userId !== ws.userId
        );

        // Delete room if empty
        if (newPlayers.length === 0) {
            Rooms.setVal(ws.roomId, "turn", room.turn || "");
            delete ROOMS[ws.roomId];
            return false;
        } else {
            newPlayers.forEach((player) =>
                player.send(messageSchemas("leave", `${ws.userName} left`))
            );
            room.players = newPlayers;
            room.ready = false;
            return true;
        }
    } catch (err) {
        if (err.message === "room not found") return;
        logger.error(`Internal Server Error: ${err.stack || err}`);
    }
}

module.exports = onclose;
