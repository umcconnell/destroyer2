let { messageSchemas } = require("../models/schemas");

exports.heartbeat = function() {
    this.isAlive = true;
};
exports.noop = () => {};

exports.rejectWs = ws => ws.send(messageSchemas("error", "invalid input"));
