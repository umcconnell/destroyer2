import logger from "#helpers/logger";

import Rooms from "#models/rooms";
import { messageSchemas } from "#models/schemas";
import { validGameField } from "#helpers/game";

export default async function place(msg, ws, wss, room) {
    let valid = validGameField(msg.split(""));

    if (!valid.valid) {
        ws.send(messageSchemas("error", valid.msg));
    } else {
        try {
            let has = await Rooms.hasVal(ws.roomId, `sea-${ws.userId}`);
            if (!has) {
                await Rooms.setVal(ws.roomId, `sea-${ws.userId}`, msg);

                ws.placed = true;
                if (room.players.every((player) => player.placed))
                    room.ready = true;

                let other = room.players.find(
                    (user) => user.userId !== ws.userId && user.placed
                );

                if (other) {
                    other.send(
                        messageSchemas(
                            "ready",
                            JSON.stringify({
                                msg: `${ws.userName} placed his ships`,
                                enemy: ws.userName
                            })
                        )
                    );
                }

                ws.send(
                    messageSchemas(
                        other ? "ready" : "placed",
                        other
                            ? JSON.stringify({
                                  msg: `successfully placed ships`,
                                  enemy: other.userName
                              })
                            : "successfully placed ships"
                    )
                );
            }
        } catch (err) {
            logger.error(`Internal Server Error: ${err.stack || err}`);
            ws.send(messageSchemas("error", "internal server error"));
        }
    }
}
