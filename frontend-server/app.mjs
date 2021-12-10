import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from "express";
import morgan from "morgan";
import logger from "#helpers/logger";
import { toBool } from "#helpers/utils";

import controller from "#frontend-server/controllers/index";

let app = express();

app.use(morgan("dev", { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (toBool(process.env.SERVE_STATIC || true)) {
    app.use(express.static(path.join(__dirname, "..", "public")));
}

app.use("/", controller);
app.disable("x-powered-by");

// Handle 404
app.use(function (req, res) {
    res.status(404).json({
        error: "Page not Found"
    });
});

// Handle 500
app.use(function (err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    logger.error(`Internal Server Error: ${err.stack || err}`);

    let errStatus = err.status || process.env.HTTP_SERVER_ERROR || 500;

    return res.status(errStatus).json({ error: "Internal Server Error" });
});

export default app;
