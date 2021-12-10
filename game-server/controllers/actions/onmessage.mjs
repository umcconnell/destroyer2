import logger from "#helpers/logger";

import { pipe } from "#helpers/utils";
import { rejectWs } from "#helpers/websocket";
import {
    cleanUTFString,
    sanitizeHTMLString
} from "#helpers/stringSanitization";

import fire from "./fire.mjs";
import place from "./place.mjs";

let types = {
    fire,
    place,
    default: () => ""
};

let sanitize = pipe([cleanUTFString, sanitizeHTMLString]);

function handleMessage(type) {
    if (types.hasOwnProperty(type)) return types[type];
    else return types["default"];
}

export default function onmessage(msg, ws, wss, room) {
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
