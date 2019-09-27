let winston = require("winston");
let environment = process.env.NODE_ENV || "production";
let logLevel = environment === "production" ? "info" : "debug";

let config = {
    console: {
        format: winston.format.combine(
            winston.format.errors({ stack: true }),
            winston.format.splat(),
            winston.format.colorize(),
            winston.format.simple()
        )
    },
    file: {
        level: logLevel,
        filename: "logs/log.log",
        maxsize: 5000000, // 5MB
        maxFiles: 5,
        format: winston.format.combine(
            winston.format.errors({ stack: true }),
            winston.format.splat(),
            winston.format.uncolorize(),
            winston.format.simple()
        )
    }
};

let logger = winston.createLogger({
    level: logLevel,
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console(
            Object.assign(
                {},
                config.console,
                environment === "production" ? { level: "error" } : {}
            )
        ),
        new winston.transports.File(
            Object.assign({}, config.file, {
                level: "error",
                filename: "logs/error.log"
            })
        ),
        new winston.transports.File(
            Object.assign({}, config.file, { filename: "logs/combined.log" })
        )
    ],
    exitOnError: false
});

logger.stream = {
    write: function(message, encoding) {
        logger.debug(message);
    }
};

module.exports = logger;
