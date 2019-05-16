let root = require("app-root-path");
let { messageSchemas } = require(`${root}/models/schemas`);

module.exports = function(msg, ws, wss, room) {
    return ws.send(messageSchemas("turn", room.turn === ws.userId));
};
