# Destroyer2 docs

## Table of Contents

-   [Customizing](#customizing)
    -   [Environment](#environment)
    -   [Logging](#logging)

## Customizing

### Environment

By adding a `.env` file and a redis configuration file (`redis.conf`) in the
`db/` folder, you can customize your setup.

You can use following values in the `.env` file:

-   `PORT` - The port to serve the project on
-   `HTTP_SERVER_ERROR` - The error code to print out when encountering a
    server error
-   `REDIS_URL` - The redis url the server should connect to. If left empty the
    server tries connecting to the default url 127.0.0.1:6379
-   `DB_PASS` - The redis database password

**Note:** When using a password you must add it to the `.env` file **and** to
the redis configuration file.

### Logging

You can customize the log formats in `/helpers/logger.js`. The `config` variable
is worth mentioning here, as it contains the basic configuration for the file
and console transports.

For example, you could output the file logs in prettyprinted JSON with
timestamps:

```diff
 file: {
     level: environment === "production" ? "info" : "debug",
     filename: "logs/log.log",
     maxsize: 5000000, // 5MB
     maxFiles: 5,
     format: winston.format.combine(
         winston.format.errors({ stack: true }),
         winston.format.splat(),
         winston.format.uncolorize(),
-        winston.format.simple()
+        winston.format.timestamp(),
+        winston.format.prettyPrint(),
+        winston.format.json()
     )
 }
```

Find out more about customizing winston logs on the
[winston homepage](https://github.com/winstonjs/winston)
