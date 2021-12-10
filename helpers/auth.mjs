import logger from "#helpers/logger";

import jwt from "jsonwebtoken";
const JWT_KEY = process.env.JWT_KEY;

if (!JWT_KEY) logger.error("NO JSON WEB TOKEN KEY SPECIFIED!");

export function sign(payload) {
    return new Promise((res, rej) => {
        jwt.sign(payload, JWT_KEY, { algorithm: "HS256" }, (err, token) => {
            if (err) {
                logger.debug(`JWT error: ${err.message}`);
                rej(err.message);
            } else {
                res(token);
            }
        });
    });
}

export function verify(token, { maxAge = "1d", clockTolerance = 60 } = {}) {
    return new Promise((res, rej) => {
        jwt.verify(
            token,
            JWT_KEY,
            { algorithms: ["HS256"], clockTolerance, maxAge },
            (err, decoded) => {
                if (err) {
                    logger.debug(`JWT error: ${err.message}`);
                    rej(err.message);
                } else {
                    res(decoded);
                }
            }
        );
    });
}
