const redis = require("redis");
const bluebird = require("bluebird");
const logger = require("../helpers/logger");
bluebird.promisifyAll(redis);

let client = redis.createClient({
    password: process.env.DB_PASS
});

// TODO: remove in production
client
    .monitorAsync()
    .then(res => logger.info("Entering monitoring mode"))
    .catch(err => logger.error("Error while entering monitoring mode"));

client.on("monitor", (time, args) => logger.info(time + ": " + args.join(" ")));

module.exports = client;
