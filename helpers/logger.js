let winston = require("winston");
let environment = process.env.NODE_ENV || "production";

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
        level: environment === "production" ? "info" : "debug",
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
    level: environment === "production" ? "info" : "debug",
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console(config.console),
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
        logger.info(message);
    }
};

module.exports = logger;
