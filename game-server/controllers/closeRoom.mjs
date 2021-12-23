import logger from "#helpers/logger";

import Rooms from "#models/rooms";
import { messageSchemas } from "#models/schemas";

export async function closeRoom(ws, user, roomId, wss, ROOMS) {
    for (let client of wss.clients) {
        if (client.roomId === roomId) {
            client.send(messageSchemas("kick", "room was closed"));
            return client.terminate();
        }
    }

    // Room could be deleted or expired, but might still be in openrooms
    try {
        await Rooms.untrack(roomId);
    } catch (err) {
        logger.error(`Internal Server Error: ${err.stack || err}`);
    }
}
