let root = require("app-root-path");
let logger = require(`${root}/helpers/logger`);

let jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;

if (!JWT_KEY) logger.error("NO JSON WEB TOKEN KEY SPECIFIED!");

exports.verify = (token, { maxAge = "1d", clockTolerance = 60 } = {}) => {
    return new Promise((res, rej) => {
        jwt.verify(
            token,
            JWT_KEY,
            { algorithms: ["HS256"], clockTolerance, maxAge },
            (err, decoded) => {
                if (err) {
                    logger.debug(`JWT error: ${err.message}`);
                    rej(err.message);
                }
                res(decoded);
            }
        );
    });
};
