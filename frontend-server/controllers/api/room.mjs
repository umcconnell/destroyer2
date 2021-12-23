import { uuid } from "#helpers/helpers";

import Rooms from "#models/rooms";
import { RoomSchema } from "#models/schemas";

export async function openRooms(req, res, errorHandler) {
    try {
        const lastModified = await Rooms.roomsLastModified();
        const lastModifiedUser = req.get("If-Modified-Since") || "";

        if (lastModified) res.setHeader("Modified-Since", lastModified);
        res.setHeader(
            "Cache-Control",
            "private, no-cache, no-store, must-revalidate"
        );

        if (
            !lastModified ||
            !lastModifiedUser ||
            lastModifiedUser < lastModified
        ) {
            const rooms = await Rooms.getOpenRooms();
            res.status(200).json([...rooms]);
        } else {
            res.status(304).end();
        }
    } catch (e) {
        errorHandler(e);
    }
}

export async function newRoom(req, res, errorHandler) {
    try {
        const { userId, userName } = req.user;
        const { roomName, secret = false } = req.body;

        const roomId = uuid();
        const room = new RoomSchema({
            owner: userName,
            ownerId: userId,
            name: roomName,
            secret
        });

        await Rooms.create(roomId, room);
        res.status(200).json({ roomId });
    } catch (e) {
        errorHandler(e);
    }
}

export async function deleteRoom(req, res, errorHandler) {
    try {
        const { userId } = req.user;
        const { roomId } = req.body;

        const room = await Rooms.read(roomId);

        if (room === null) {
            res.status(404).json({
                error: "room doesn't exist"
            });
        } else if (room.ownerId !== userId) {
            res.status(403).json({
                error: "you are not the owner of this room"
            });
        } else {
            await Rooms.remove(roomId);

            res.status(200).json({
                message: "successfully deleted room"
            });
        }
    } catch (e) {
        errorHandler(e);
    }
}
