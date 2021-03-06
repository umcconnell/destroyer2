let logger = require("@helpers/logger");

let { pipe } = require("@helpers/utils");
let { rejectWs } = require("@helpers/websocket");
let {
    cleanUTFString,
    sanitizeHTMLString
} = require("@helpers/stringSanitization");

let types = {
    fire: require("./fire"),
    place: require("./place"),
    default: () => ""
};

let sanitize = pipe([cleanUTFString, sanitizeHTMLString]);

function handleMessage(type) {
    if (types.hasOwnProperty(type)) return types[type];
    else return types["default"];
}

function onmessage(msg, ws, wss, room) {
    logger.debug(`received: ${msg}`);

    try {
        msg = JSON.parse(msg);
    } catch (errr) {
        return rejectWs(ws);
    }

    if (!msg.type || !msg.msg) return rejectWs(ws);

    // Sanitize message
    msg.msg = sanitize(msg.msg);

    return handleMessage(msg.type)(msg.msg, ws, wss, room);
}

module.exports = onmessage;
