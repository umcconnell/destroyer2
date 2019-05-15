let { messageSchemas } = require("../../../models/schemas");
let logger = require("../../../helpers/logger");

module.exports = function(msg, ws, wss, room) {
    logger.debug(`Recieved chat msg: ${msg}`);
    room.players.forEach(player => player.send(messageSchemas("chat", msg)));
};
