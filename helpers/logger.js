let winston = require("winston");
let environment = process.env.NODE_ENV || "production";

let config = {
    console: {
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    },
    errorLog: {
        level: "error",
        filename: "logs/error.log",
        maxsize: 5000000, // 5MB
        maxFiles: 5
    },
    combinedLog: {
        level: environment === "production" ? "info" : "debug",
        filename: "logs/combined.log",
        maxsize: 5000000, // 5MB
        maxFiles: 5
    }
};

let logger = winston.createLogger({
    level: environment === "production" ? "info" : "debug",
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console(config.console),
        new winston.transports.File(config.errorLog),
        new winston.transports.File(config.combinedLog)
    ],
    exitOnError: false
});

logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    }
};

module.exports = logger;
