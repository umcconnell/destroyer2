let winston = require("winston");
let environment = process.env.NODE_ENV || "production";

let logger = winston.createLogger({
    level: environment === "production" ? "info" : "debug",
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.simple()
})

module.exports = logger;