let root = require("app-root-path");
let logger = require(`${root}/helpers/logger`);

let Users = require(`${root}/models/users`);
let Rooms = require(`${root}/models/rooms`);

function verifyConnection(clients, params) {
    let reject = (msg, status) => {
        // Custom error log
        if (msg)
            logger.error(
                `WebSocket Error${status ? " " + status : ""}${
                    msg ? " : " + msg : ""
                }`
            );

        return {
            accepted: false,
            status: status || 500,
            msg: msg || "server error"
        };
    };

    if (!params.t || !params.r)
        return reject("please specify user-token and room-token", 400);

    let userAlreadyConnected = Array.from(clients).find(
        (client) => client.userId === params.t
    );
    if (userAlreadyConnected)
        return reject("user already connected to room", 403);

    return Users.exists(params.t)
        .then((exists) => {
            if (!exists) throw "unauthorized";
        })
        .then(() =>
            Rooms.get(params.r)
                .then((room) => {
                    if (!room) throw "room not found";
                    let players = room.players
                        .split(",")
                        // Remove empty fields (e.g "".split(",") => [""])
                        .filter((el) => !!el);

                    if (players.includes(params.t))
                        throw "player already in room";
                    else if (players.length < 2) return players;
                    else throw "room full";
                })
                // Add player to players list
                .then((players) =>
                    Rooms.update(
                        params.r,
                        "players",
                        players.concat([params.t]).join(",")
                    )
                        // Room is full?
                        .then(() => players.length + 1 === 2)
                        .catch(reject)
                )
                // Remove from openrooms if full
                .then((full) =>
                    full
                        ? Rooms.close(params.r).catch(() => {
                              throw "server error";
                          })
                        : ""
                )
                // Accept user
                .then(() => ({ accepted: true }))
        )
        .catch(reject);
}

module.exports = verifyConnection;
