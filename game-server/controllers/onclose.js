let root = require("app-root-path");
let logger = require(`${root}/helpers/logger`);

let Rooms = require(`${root}/models/rooms`);
let { messageSchemas } = require(`${root}/models/schemas`);

function closeWs(playerId, roomId) {
    return (
        Rooms.get(roomId)
            .then(room => {
                if (!room) throw new Error("room not found");
                return (
                    room.players
                        .split(",")
                        // Remove empty fields (e.g "".split(",") => [""])
                        .filter(el => !!el)
                );
            })
            // Set new players and remove player sea
            .then(players => {
                let newPlayers = players.filter(id => id !== playerId);
                return Rooms.update(
                    roomId,
                    "players",
                    newPlayers.join(",")
                ).then(() => newPlayers);
            })
            .then(players => {
                players.length < 2 ? Rooms.open(roomId) : "";
            })
    );
}

function onclose(msg, ws, wss, room, ROOMS) {
    return closeWs(ws.userId, ws.roomId)
        .then(() => {
            let newPlayers = room.players.filter(
                player => player.userId !== ws.userId
            );

            // Delete room if empty
            if (newPlayers.length === 0) {
                Rooms.setVal(ws.roomId, "turn", room.turn || "");
                delete ROOMS[ws.roomId];
                return false;
            } else {
                newPlayers.forEach(player =>
                    player.send(messageSchemas("leave", "a player left"))
                );
                room.players = newPlayers;
                room.ready = false;
                return true;
            }
        })
        .catch(err => {
            if (err.message === "room not found") return;
            logger.error(`Internal Server Error: ${err.stack || err}`);
        });
}

module.exports = onclose;
