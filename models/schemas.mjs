export class RoomSchema {
    constructor({ name, owner, ownerId, secret = false }) {
        this.name = name;
        this.owner = owner;
        this.ownerId = ownerId;
        this.open = 1;
        this.players = "";
        this.secret = secret ? 1 : 0;
    }
}

export class ServerError extends Error {
    constructor(status = 500, msg = "Internal Server Error") {
        super(msg);
        this.name = "ServerError";
        this.status = status;
    }
}

export const messageSchemas = (type, msg) => ({ type, msg });

export class RoomInfo {
    constructor(player) {
        this.players = [player];
        this.ready = false;
    }
}
