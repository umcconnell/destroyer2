let root = require("app-root-path");

let Rooms = require(`${root}/models/rooms`);

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
