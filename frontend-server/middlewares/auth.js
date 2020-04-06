let root = require("app-root-path");
let logger = require(`${root}/helpers/logger`);

let jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;

if (!JWT_KEY) logger.error("NO JSON WEB TOKEN KEY SPECIFIED!");

function reject(res) {
    res.status(403).json({ error: "unauthorized" });
}

const middleware = (req, res, next) => {
    let [type, token] = (req.get("Authorization") || "").split(" ");

    if (type && type == "Bearer" && token) {
        jwt.verify(
            token,
            JWT_KEY,
            {
                algorithms: ["HS256"],
                clockTolerance: 60,
                maxAge: "1d"
            },
            (err, decoded) => {
                if (err) reject(res);
                else {
                    req.user = decoded;
                    next();
                }
            }
        );
    } else {
        reject(res);
    }
};

module.exports = middleware;
