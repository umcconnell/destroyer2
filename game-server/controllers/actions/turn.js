let { messageSchemas } = require("../../../models/schemas");

module.exports = function(msg, ws, wss, room) {
    return ws.send(messageSchemas("turn", room.turn === ws.userId));
};
