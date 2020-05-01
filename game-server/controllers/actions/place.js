let logger = require("@helpers/logger");

let Rooms = require("@models/rooms");
let { messageSchemas } = require("@models/schemas");
let { validGameField } = require("@helpers/game");

module.exports = async function (msg, ws, wss, room) {
    let valid = validGameField(msg.split(""));

    if (!valid.valid) {
        ws.send(messageSchemas("error", valid.msg));
    } else {
        try {
            let has = await Rooms.hasVal(ws.roomId, `sea-${ws.userId}`);
            if (!has) {
                await Rooms.update(ws.roomId, `sea-${ws.userId}`, msg);

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
};
