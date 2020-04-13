let root = require("app-root-path");
let { messageSchemas } = require(`${root}/models/schemas`);

module.exports = function (msg, ws, wss, room) {
    if (room.players.length == 2) {
        let turn = room.players.find((ws) => ws.userId == room.turn);
        if (!turn) room.turn = ws.userId;
    }
    return ws.send(messageSchemas("turn", room.turn === ws.userId));
};
