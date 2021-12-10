import { Router } from "express";
let router = Router();

import validate from "#frontend-server/middlewares/validator";
import sanitize from "#frontend-server/middlewares/sanitizer";
import auth from "#frontend-server/middlewares/auth";

import { openRooms, newRoom, deleteRoom } from "./room.mjs";
import { login } from "./user.mjs";

import { userName, roomName, roomSecret, roomId } from "#models/validation";

if (process.env.NODE_ENV !== "production") {
    // API show available endpoints.
    router.get("/", function (req, res) {
        res.sendFile("/api.html", { root: "./public" });
    });
}

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

export default router;
