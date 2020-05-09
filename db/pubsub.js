const redis = require("redis");

let pub = redis.createClient({
        password: process.env.DB_PASS,
        url: process.env.DB_URL
    }),
    sub = pub.duplicate();

module.exports = { pub, sub };
