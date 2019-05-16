let root = require("app-root-path");
let logger = require(`${root}/helpers/logger`);

let Rooms = require(`${root}/models/rooms`);
let { messageSchemas } = require(`${root}/models/schemas`);
let { countShips } = require(`${root}/helpers/game`);

module.exports = function(msg, ws, wss, room) {
    let other = room.players.find(player => player.userId !== ws.userId);

    return Rooms.get(ws.roomId)
        .then(Room => {
            let seas = Object.keys(Room)
                .filter(key => key.startsWith("sea-"))
                .map(sea => sea.slice(4));

            // Case: sea already placed
            if (seas.includes(ws.userId)) {
                let mySea = Room[`sea-${ws.userId}`],
                    enemySea =
                        seas.find(sea => sea !== ws.userId) &&
                        Room[`sea-${seas.find(sea => sea !== ws.userId)}`];

                // let user skip shippicker interface
                let msg = mySea;
                // Add enemy field if placed
                if (enemySea) {
                    msg = msg.concat(";").concat(
                        enemySea
                            .split("")
                            .map(field =>
                                field === "1" || field === "2" ? field : "0"
                            )
                            .join("")
                    );
                }

                ws.send(messageSchemas("alreadyPlaced", msg));

                // Send ships counter to player if he already played
                // with other player
                if (enemySea) {
                    ws.send(
                        messageSchemas(
                            "count",
                            JSON.stringify({
                                me: countShips(mySea.split("")).reduce(
                                    (acc, curr) => (curr === 0 ? acc : acc + 1),
                                    0
                                ),
                                enemy:
                                    enemySea &&
                                    countShips(enemySea.split("")).reduce(
                                        (acc, curr) =>
                                            curr === 0 ? acc : acc + 1,
                                        0
                                    )
                            })
                        )
                    );
                }

                ws.placed = true;

                other &&
                    other.send(messageSchemas("join", "a player rejoined"));

                // remove loader if other player waiting
                if (
                    room.players.length > 1 &&
                    room.players.every(player => player.placed)
                ) {
                    room.ready = true;
                    room.players.forEach(player =>
                        player.send(
                            messageSchemas("ready", "opponent placed his ships")
                        )
                    );
                }
            } else {
                // Case: player newly joined, but other player waiting with placed ship
                if (seas.length > 1) {
                    seas.forEach(sea => Rooms.delVal(ws.roomId, `sea-${sea}`));

                    other &&
                        other.placed &&
                        other.send(
                            messageSchemas("reset", "a different player joined")
                        );

                    room.players.forEach(player => (player.placed = false));
                } else {
                    other &&
                        other.send(
                            messageSchemas("join", "a new player joined")
                        );
                }
            }
        })
        .catch(err => {
            logger.error(err => `Internal Server Error: ${err.stack || err}`);
            ws.send(messageSchemas("error", "internal server error"));
        });
};
