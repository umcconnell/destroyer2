import logger from "#helpers/logger";

const CONNECTION_RETRY = process.env.DB_CONNECTION_RETRY || 20;

export default function reconnectStrategy(options) {
    if (process.env.NODE_ENV !== "production") {
        return new Error("DB connection retry not attempted (not production)");
    } else if (options.total_retry_time > 1000 * 60 * 60) {
        return new Error("DB connection retry time exhausted");
    } else if (options.attempt > CONNECTION_RETRY) {
        return new Error("DB connection attempts exhausted");
    } else if (options.attempt % 10 == 0) {
        logger.warn("Database connection failed! Retrying...");
    }
    return Math.min(options.attempt * 100, 3000);
}
