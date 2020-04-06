let express = require("express");
let router = express.Router();
let root = require("app-root-path");

let validate = require(`${root}/frontend-server/middlewares/validator`);
let sanitize = require(`${root}/frontend-server/middlewares/sanitizer`);
let auth = require(`${root}/frontend-server/middlewares/auth`);

let { openRooms, newRoom } = require("./room");

let { uuid } = require(`${root}/helpers/helpers`);
let Users = require(`${root}/models/users`);
let Rooms = require(`${root}/models/rooms`);
let { validatorSchema, roomSchema } = require(`${root}/models/schemas`);

let { pub } = require(`${root}/db/pubsub`);

// API show available endpoints.
router.get("/", function (req, res) {
    res.sendFile("/api.html", { root: "./frontend-server/public" });
});

router.get("/openrooms", openRooms);

router.post(
    "/login",
    sanitize("body"),
    validate("body", validatorSchema.userName),
    (req, res, errorHandler) => {
        let id = uuid();

        Users.create(id, req.body.userName)
            .then((val) =>
                res
                    .status(200)
                    .json({ userId: id, userName: req.body.userName })
            )
            .catch(errorHandler);
    }
);

router.post(
    "/newroom",
    auth,
    sanitize("body"),
    validate("body", validatorSchema.roomName),
    validate("body", validatorSchema.roomSecret),
    newRoom
);

router.delete(
    "/deleteroom",
    validate("body", validatorSchema.userAuth),
    validate("body", validatorSchema.roomId),
    (req, res, errorHandler) => {
        let { userName, userId, roomId } = req.body;
        Users.auth(userName, userId)
            .then((authorized) => {
                if (!authorized)
                    res.status(403).json({ error: "unauthorized" });
                else {
                    Rooms.get(roomId)
                        .then((room) => {
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
            .then((exists) => {
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
