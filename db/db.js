const redis = require("redis");
const bluebird = require("bluebird");
const logger = require("@helpers/logger");

const retry_strategy = require("./retryStrategy");

bluebird.promisifyAll(redis);

let client = redis.createClient({
    password: process.env.DB_PASS,
    url: process.env.DB_URL,
    retry_strategy
});

if (process.env.AGGRESSIVE_CLEANUP) {
    client.config("set", ["notify-keyspace-events", "Ex"]);
}

if (process.env.NODE_ENV !== "production") {
    client
        .monitorAsync()
        .then(res => logger.info("Entering monitoring mode"))
        .catch(err => logger.error("Error while entering monitoring mode"));

    client.on("monitor", (time, args) =>
        logger.info(time + ": " + args.join(" "))
    );
}

module.exports = client;
