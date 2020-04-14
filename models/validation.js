let Joi = require("@hapi/joi");

exports.userAuth = Joi.object()
    .keys({
        userId: Joi.string().uuid().required(),
        userName: Joi.string().max(20).required()
    })
    .pattern(/./, Joi.any());

exports.userName = Joi.object()
    .keys({ userName: Joi.string().max(20).required() })
    .pattern(/./, Joi.any());

exports.userId = Joi.object()
    .keys({ userId: Joi.string().uuid().required() })
    .pattern(/./, Joi.any());

exports.roomDetails = Joi.object()
    .keys({
        roomName: Joi.string().max(20).required(),
        roomId: Joi.string().uuid().required(),
        secret: Joi.bool()
    })
    .pattern(/./, Joi.any());

exports.roomName = Joi.object()
    .keys({ roomName: Joi.string().max(20).required() })
    .pattern(/./, Joi.any());

exports.roomId = Joi.object()
    .keys({ roomId: Joi.string().uuid().required() })
    .pattern(/./, Joi.any());

exports.roomSecret = Joi.object()
    .keys({ secret: Joi.bool() })
    .pattern(/./, Joi.any());
