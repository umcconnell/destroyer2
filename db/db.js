let root = require("app-root-path");
const redis = require("redis");
const bluebird = require("bluebird");
const logger = require(`${root}/helpers/logger`);
bluebird.promisifyAll(redis);

let client = redis.createClient({
    password: process.env.DB_PASS,
    url: process.env.REDIS_URL
});

if (process.env.AGGRESSIVE_CLEANUP) {
    client.config("set", ["notify-keyspace-events", "Ex"]);
}

if (process.env.NODE_ENV !== "production") {
    client
        .monitorAsync()
        .then((res) => logger.info("Entering monitoring mode"))
        .catch((err) => logger.error("Error while entering monitoring mode"));

    client.on("monitor", (time, args) =>
        logger.info(time + ": " + args.join(" "))
    );
}

module.exports = client;
