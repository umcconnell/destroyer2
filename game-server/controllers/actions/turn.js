let { messageSchemas } = require("@models/schemas");

module.exports = function (msg, ws, wss, room) {
    if (room.players.length == 2) {
        let turn = room.players.find((ws) => ws.userId == room.turn);
        if (!turn) room.turn = ws.userId;
    }
    return ws.send(messageSchemas("turn", room.turn === ws.userId));
};
