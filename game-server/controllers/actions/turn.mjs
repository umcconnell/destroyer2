import { messageSchemas } from "#models/schemas";

export default function turn(msg, ws, wss, room) {
    if (room.players.length == 2) {
        let turn = room.players.find((ws) => ws.userId == room.turn);
        if (!turn) room.turn = ws.userId;
    }
    return ws.send(messageSchemas("turn", room.turn === ws.userId));
}
