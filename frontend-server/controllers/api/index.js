let express = require("express");
let router = express.Router();
let root = require("app-root-path");

let validate = require(`${root}/frontend-server/middlewares/validator`);
let sanitize = require(`${root}/frontend-server/middlewares/sanitizer`);
let auth = require(`${root}/frontend-server/middlewares/auth`);

let { openRooms, newRoom, deleteRoom } = require("./room");
let { login } = require("./user");

let {
    userName,
    roomName,
    roomSecret,
    roomId
} = require(`${root}/models/validation`);

// API show available endpoints.
router.get("/", function (req, res) {
    res.sendFile("/api.html", { root: "./frontend-server/public" });
});

router.get("/openrooms", openRooms);

router.post("/login", validate("body", userName), sanitize("body"), login);

router.post(
    "/newroom",
    auth,
    validate("body", roomName),
    sanitize("body"),
    validate("body", roomSecret),
    newRoom
);

router.delete("/deleteroom", auth, validate("body", roomId), deleteRoom);

module.exports = router;
