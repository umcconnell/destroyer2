const redis = require("redis");
const retry_strategy = require("./retryStrategy");

let pub = redis.createClient({
        password: process.env.DB_PASS,
        url: process.env.DB_URL,
        retry_strategy
    }),
    sub = pub.duplicate();

module.exports = { pub, sub };
