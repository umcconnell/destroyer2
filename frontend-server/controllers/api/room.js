let root = require("app-root-path");
let { uuid } = require(`${root}/helpers/helpers`);

let Rooms = require(`${root}/models/rooms`);
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
    // FIXME: User with same name can delete room => save ownerId but don't show
    try {
        let { userId, userName } = req.user;
        let { roomName, secret = false } = req.body;

        const roomId = uuid();
        const room = new roomSchema({
            owner: userName,
            name: roomName,
            secret
        });

        await Rooms.create(roomId, room);
        res.status(200).json({ roomId });
    } catch (e) {
        errorHandler(e);
    }
};
