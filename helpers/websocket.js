let root = require("app-root-path");
let { messageSchemas } = require(`${root}/models/schemas`);

exports.heartbeat = function() {
    this.isAlive = true;
};
exports.noop = () => {};

exports.rejectWs = ws => ws.send(messageSchemas("error", "invalid input"));
