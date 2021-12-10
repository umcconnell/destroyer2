import { findOccurrences, replaceAt } from "#helpers/utils";
import { toIndex } from "#helpers/game";
import logger from "#helpers/logger";

import * as Rooms from "#models/rooms";
import { messageSchemas } from "#models/schemas";
import gameOver from "./gameOver.mjs";

export default async function fire(coords, ws, wss, room) {
    if (!room.ready) return;
    // Ignore wrong off-turn fires
    else if (room.turn !== ws.userId) return;

    let index = toIndex(coords),
        other = room.players.find((player) => player.userId !== ws.userId);

    try {
        let r = await Rooms.read(ws.roomId);
        let sea = r[`sea-${other.userId}`];

        switch (sea[index]) {
            case "0":
                sea = replaceAt(sea, index, "2");

                room.players.forEach((player) =>
                    player.send(
                        messageSchemas(
                            "miss",
                            JSON.stringify({
                                you: player.userId === other.userId,
                                coords
                            })
                        )
                    )
                );

                // Switch turn to next player
                room.turn = other.userId;
                break;

            case "1":
            case "2":
                break;

            default:
                let type =
                    findOccurrences(sea, sea[index]).length === 1
                        ? "sunk"
                        : "hit";

                sea = replaceAt(sea, index, "1");

                room.players.forEach((player) =>
                    player.send(
                        messageSchemas(
                            type,
                            JSON.stringify({
                                you: player.userId === other.userId,
                                coords
                            })
                        )
                    )
                );

                break;
        }

        if (findOccurrences(sea, "1").length === 17)
            return gameOver(coords, ws, wss, room);
        else return Rooms.setVal(ws.roomId, `sea-${other.userId}`, sea);
    } catch (err) {
        logger.error(`Internal Server Error: ${err.stack || err}`);
        room.players.forEach((player) =>
            player.send(messageSchemas("error", "internal server error"))
        );
    }
}
