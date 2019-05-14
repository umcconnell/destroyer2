let winston = require("winston");
let environment = process.env.NODE_ENV || "production";

let config = {
    console: {
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }
};

let logger = winston.createLogger({
    level: environment === "production" ? "info" : "debug",
    format: winston.format.simple(),
    transports: [new winston.transports.Console(config.console)],
    exitOnError: false
});

logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    }
};

module.exports = logger;
