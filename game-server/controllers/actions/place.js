let Rooms = require("../../../models/rooms");
let { messageSchemas } = require("../../../models/schemas");
let { validGameField } = require("../../../helpers/game");
let logger = require("../../../helpers/logger");

module.exports = function(msg, ws, wss, room) {
    console.log(msg);
    let valid = validGameField(msg.split(""));

    if (!valid.valid) {
        ws.send(messageSchemas("error", valid.msg));
    } else {
        Rooms.hasVal(ws.roomId, `sea-${ws.userId}`)
            .then(has => {
                if (!has) {
                    return Rooms.update(
                        ws.roomId,
                        `sea-${ws.userId}`,
                        msg
                    ).then(() => {
                        ws.placed = true;
                        if (room.players.every(player => player.placed))
                            room.ready = true;

                        let other = room.players.find(
                            user => user.userId !== ws.userId && user.placed
                        );

                        other &&
                            other.send(
                                messageSchemas(
                                    "ready",
                                    "opponent placed his ships"
                                )
                            );

                        ws.send(
                            messageSchemas(
                                other ? "ready" : "placed",
                                "successfully placed ships"
                            )
                        );
                    });
                }
            })
            .catch(err => {
                logger.error(`Internal Server Error: ${err.stack || err}`);
                ws.send(messageSchemas("error", "internal server error"))
            });
    }
};
