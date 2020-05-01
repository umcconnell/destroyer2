let url = require("url");

let { verify } = require("@helpers/auth");

let { ServerError } = require("@models/schemas");

exports.verifyConnection = async function verifyConnection(clients, req) {
    let { t: token, r: roomId } = url.parse(req.url, true).query;

    if (!token || !roomId)
        throw new ServerError(400, "please specify user-token and room-token");

    let user;
    try {
        user = await verify(token);
    } catch (e) {
        throw new ServerError(401, "unauthorized");
    }

    let userAlreadyConnected = Array.from(clients).find(
        (client) => client.userId === user.userId
    );
    if (userAlreadyConnected)
        throw new ServerError(403, "user already connected to room");

    return { user, roomId };
};
