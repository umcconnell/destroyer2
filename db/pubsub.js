const redis = require("redis");

let pub = redis.createClient({
        password: process.env.DB_PASS,
        url: process.env.REDIS_URL
    }),
    sub = pub.duplicate();

module.exports = { pub, sub };
