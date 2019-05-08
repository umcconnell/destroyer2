let { messageSchemas } = require("../../../models/schemas");

module.exports = function(msg, ws, wss, room) {
    console.log(`Recieved chat msg: ${msg}`);
    room.players.forEach(player => player.send(messageSchemas("chat", msg)));
};
