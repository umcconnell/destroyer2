let Joi = require("@hapi/joi");

module.exports.validatorSchema = {
    userAuth: Joi.object()
        .keys({
            userId: Joi.string().uuid().required(),
            userName: Joi.string().max(20).required()
        })
        .pattern(/./, Joi.any()),
    userName: Joi.object()
        .keys({
            userName: Joi.string().max(20).required()
        })
        .pattern(/./, Joi.any()),
    userId: Joi.object()
        .keys({
            userId: Joi.string().uuid().required()
        })
        .pattern(/./, Joi.any()),
    roomDetails: Joi.object()
        .keys({
            roomName: Joi.string().max(20).required(),
            roomId: Joi.string().uuid().required(),
            secret: Joi.bool()
        })
        .pattern(/./, Joi.any()),
    roomName: Joi.object()
        .keys({
            roomName: Joi.string().max(20).required()
        })
        .pattern(/./, Joi.any()),
    roomId: Joi.object()
        .keys({
            roomId: Joi.string().uuid().required()
        })
        .pattern(/./, Joi.any()),
    roomSecret: Joi.object()
        .keys({
            secret: Joi.bool()
        })
        .pattern(/./, Joi.any())
};

module.exports.roomSchema = class {
    constructor({ name, owner, ownerId, secret = false }) {
        this.name = name;
        this.owner = owner;
        this.ownerId = ownerId;
        this.open = 1;
        this.players = "";
        this.secret = secret ? 1 : 0;
    }
};

module.exports.ServerError = class ServerError extends Error {
    constructor(status = 500, msg = "Internal Server Error") {
        super(msg);
        this.name = "ServerError";
        this.status = status;
    }
};

module.exports.messageSchemas = (type, msg) => ({
    type,
    msg
});

module.exports.roomInfo = class {
    constructor(player) {
        this.players = [player];
        this.ready = false;
    }
};
