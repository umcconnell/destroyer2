exports.roomSchema = class {
    constructor({ name, owner, ownerId, secret = false }) {
        this.name = name;
        this.owner = owner;
        this.ownerId = ownerId;
        this.open = 1;
        this.players = "";
        this.secret = secret ? 1 : 0;
    }
};

exports.ServerError = class ServerError extends Error {
    constructor(status = 500, msg = "Internal Server Error") {
        super(msg);
        this.name = "ServerError";
        this.status = status;
    }
};

exports.messageSchemas = (type, msg) => ({ type, msg });

exports.roomInfo = class {
    constructor(player) {
        this.players = [player];
        this.ready = false;
    }
};
