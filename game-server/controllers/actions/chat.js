let root = require("app-root-path");
let logger = require(`${root}/helpers/logger`);

let { messageSchemas } = require(`${root}/models/schemas`);

module.exports = function(msg, ws, wss, room) {
    logger.debug(`Recieved chat msg: ${msg}`);
    room.players.forEach(player => player.send(messageSchemas("chat", msg)));
};
