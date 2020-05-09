const logger = require("@helpers/logger");

const CONNECTION_RETRY = process.env.DB_CONNECTION_RETRY || 20;

function retry_strategy(options) {
    if (process.env.NODE_ENV !== "production") {
        return undefined;
    } else if (options.total_retry_time > 1000 * 60 * 60) {
        return new Error("Database connection retry time exhausted");
    } else if (options.attempt > CONNECTION_RETRY) {
        // End reconnecting with built in error
        return undefined;
    } else if (options.attempt % 10 == 0) {
        logger.warn("Database connection failed! Retrying...");
    }
    return Math.min(options.attempt * 100, 3000);
}

module.exports = retry_strategy;
