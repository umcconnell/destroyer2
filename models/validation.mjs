import Joi from "joi";

export const userAuth = Joi.object()
    .keys({
        userId: Joi.string().uuid().required(),
        userName: Joi.string().max(20).required()
    })
    .pattern(/./, Joi.any());

export const userName = Joi.object()
    .keys({
        userName: Joi.string().max(20).required()
    })
    .pattern(/./, Joi.any());

export const userId = Joi.object()
    .keys({
        userId: Joi.string().uuid().required()
    })
    .pattern(/./, Joi.any());

export const roomDetails = Joi.object()
    .keys({
        roomName: Joi.string().max(20).required(),
        roomId: Joi.string().uuid().required(),
        secret: Joi.bool()
    })
    .pattern(/./, Joi.any());

export const roomName = Joi.object()
    .keys({
        roomName: Joi.string().max(20).required()
    })
    .pattern(/./, Joi.any());

export const roomId = Joi.object()
    .keys({
        roomId: Joi.string().uuid().required()
    })
    .pattern(/./, Joi.any());

export const roomSecret = Joi.object()
    .keys({ secret: Joi.bool() })
    .pattern(/./, Joi.any());
