const redis = require("redis");

let pub = redis.createClient({
        password: process.env.DB_PASS
    }),
    sub = pub.duplicate();

module.exports = { pub, sub };
