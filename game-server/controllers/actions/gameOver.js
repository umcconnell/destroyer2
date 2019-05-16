let root = require("app-root-path");

let Rooms = require(`${root}/models/rooms`);
let { messageSchemas } = require(`${root}/models/schemas`);

module.exports = function(msg, ws, wss, room) {
    room.ready = false;
    room.turn = undefined;

    return room.players.forEach(player => {
        player.send(
            messageSchemas(
                "gameOver",
                player.userId === ws.userId ? "You win" : "You loose"
            )
        );

        player.placed = false;

        return Rooms.delVal(ws.roomId, `sea-${player.userId}`);
    });
};
