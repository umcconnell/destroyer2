let express = require("express");
let router = express.Router();
let validate = require("../middlewares/validator");
let sanitize = require("../middlewares/sanitizer");

let { uuid } = require("../../helpers/helpers");
let Users = require("../../models/users");
let Rooms = require("../../models/rooms");
let { validatorSchema, roomSchema } = require("../../models/schemas");

let { pub } = require("../../db/pubsub");

// API show available endpoints.
router.get("/", function(req, res) {
    res.sendFile("/api.html", { root: "./frontend-server/public" });
});

router.get("/openrooms", function(req, res, errorHandler) {
    Rooms.roomsLastModified()
        .then(lastModified => {
            if (lastModified) res.setHeader("Modified-Since", lastModified);
            res.setHeader(
                "Cache-Control",
                "private, no-cache, no-store, must-revalidate"
            );

            let lastModifiedUser = req.get("If-Modified-Since") || "";

            if (
                !lastModified ||
                !lastModifiedUser ||
                lastModifiedUser < lastModified
            ) {
                Rooms.openRooms()
                    .then(rooms => res.status(200).json([...rooms]))
                    .catch(errorHandler);
            } else res.status(304).end();
        })
        .catch(errorHandler);
});

router.post(
    "/login",
    sanitize("body"),
    validate("body", validatorSchema.userName),
    (req, res, errorHandler) => {
        let id = uuid();

        Users.create(id, req.body.userName)
            .then(val =>
                res
                    .status(200)
                    .json({ userId: id, userName: req.body.userName })
            )
            .catch(errorHandler);
    }
);

router.post(
    "/newroom",
    sanitize("body"),
    validate("body", validatorSchema.userAuth),
    validate("body", validatorSchema.roomName),
    validate("body", validatorSchema.roomSecret),
    (req, res, errorHandler) => {
        let { userId, userName, roomName, secret = false } = req.body;

        Users.auth(userName, userId)
            .then(authorized => {
                if (!authorized)
                    res.status(403).json({ error: "unauthorized" });
                else {
                    let roomId = uuid();
                    let room = new roomSchema({
                        owner: userName,
                        name: roomName,
                        secret
                    });

                    Rooms.create(roomId, room)
                        .then(() => res.status(200).json({ roomId }))
                        .catch(errorHandler);
                }
            })
            .catch(errorHandler);
    }
);

// TODO: delete room when owner quits => delete with WebSockets => show user a new game quit message
/* Other options:
    => extract functions to seperate functions:
    => check if user is still online
    or
    => expire keys?
    or
    => delete room after game!?
*/
// TODO: disallow deleting room if it contains players? / kick players (preferred) => redis pub/sub
router.delete(
    "/deleteroom",
    validate("body", validatorSchema.userAuth),
    validate("body", validatorSchema.roomId),
    (req, res, errorHandler) => {
        let { userName, userId, roomId } = req.body;
        Users.auth(userName, userId)
            .then(authorized => {
                if (!authorized)
                    res.status(403).json({ error: "unauthorized" });
                else {
                    Rooms.get(roomId)
                        .then(room => {
                            if (room === null)
                                res.status(404).json({
                                    error: "room doesn't exist"
                                });
                            else if (room.owner !== userName)
                                res.status(403).json({
                                    error: "you are not the owner of this room"
                                });
                            else
                                Rooms.delete(roomId)
                                    .then(() => {
                                        pub.publish("deleteroom", roomId);
                                        return res.status(200).json({
                                            message: "successfully deleted room"
                                        });
                                    })
                                    .catch(errorHandler);
                        })
                        .catch(errorHandler);
                }
            })
            .catch(errorHandler);
    }
);

router.delete(
    "/logout",
    validate("body", validatorSchema.userId),
    (req, res, errorHandler) => {
        let { userId } = req.body;
        Users.exists(userId)
            .then(exists => {
                if (exists) {
                    Users.delete(userId)
                        .then(() =>
                            res
                                .status(200)
                                .json({ message: "successfully deleted user" })
                        )
                        .catch(errorHandler);
                } else res.status(404).json({ error: "user doesn't exist" });
            })
            .catch(errorHandler);
    }
);

module.exports = router;
