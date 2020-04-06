let root = require("app-root-path");
let { uuid } = require(`${root}/helpers/helpers`);

let Rooms = require(`${root}/models/rooms`);
let { pub } = require(`${root}/db/pubsub`);
let { roomSchema } = require(`${root}/models/schemas`);

exports.openRooms = async function (req, res, errorHandler) {
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
            const rooms = await Rooms.openRooms();
            res.status(200).json([...rooms]);
        } else {
            res.status(304).end();
        }
    } catch (e) {
        errorHandler(e);
    }
};

exports.newRoom = async function (req, res, errorHandler) {
    try {
        const { userId, userName } = req.user;
        const { roomName, secret = false } = req.body;

        const roomId = uuid();
        const room = new roomSchema({
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
};

exports.deleteRoom = async function (req, res, errorHandler) {
    try {
        const { userId } = req.user;
        const { roomId } = req.body;

        const room = await Rooms.get(roomId);

        if (room === null) {
            res.status(404).json({
                error: "room doesn't exist"
            });
        } else if (room.ownerId !== userId) {
            res.status(403).json({
                error: "you are not the owner of this room"
            });
        } else {
            await Rooms.delete(roomId);
            pub.publish("deleteroom", roomId);

            res.status(200).json({
                message: "successfully deleted room"
            });
        }
    } catch (e) {
        errorHandler(e);
    }
};
