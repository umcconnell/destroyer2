let winston = require("winston");
let environment = process.env.NODE_ENV || "production";

let noColor = winston.format(info => {
    // Matches ANSI escape codes
    // taken from https://github.com/chalk/ansi-regex
    const pattern = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
    ].join("|");

    info.message = info.message.replace(pattern, "");

    return info;
});

let config = {
    console: {
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    },
    file: {
        level: environment === "production" ? "info" : "debug",
        filename: "logs/log.log",
        maxsize: 5000000, // 5MB
        maxFiles: 5
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
