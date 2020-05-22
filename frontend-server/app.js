require("dotenv").config();

let express = require("express");
let path = require("path");
let morgan = require("morgan");
let winston = require("@helpers/logger");
let { toBool } = require("@helpers/utils");

let controller = require("./controllers/index");

let app = express();

app.use(morgan("dev", { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (toBool(process.env.SERVE_STATIC || true)) {
    app.use(express.static(path.join(__dirname, "..", "public")));
}

app.use("/", controller);
app.disable("x-powered-by");

// Handle 404
app.use(function(req, res) {
    res.status(404).json({
        error: "Page not Found"
    });
});

// Handle 500
app.use(function(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    winston.error(`Internal Server Error: ${err.stack || err}`);

    let errStatus = err.status || process.env.HTTP_SERVER_ERROR || 500;

    return res.status(errStatus).json({ error: "Internal Server Error" });
});

module.exports = app;
