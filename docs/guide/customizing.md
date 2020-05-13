---
sidebarDepth: 3
---

# Customizing

## Environment

By adding a `.env` file and a redis configuration file (`redis.conf`) in the
`db/` folder, you can customize your setup.

Here's an overview of the values you can use in the `.env` file:

| Key                                | Default          | Description                            |
| ---------------------------------- | ---------------- | -------------------------------------- |
| [`Port`](#web-server)              | `8080`           | Web Server Port                        |
| [`HTTP_SERVER_ERROR`](#web-server) | `500`            | HTTP error for generic server errors   |
| [`JWT_KEY`](#jwt)                  |                  | JSON Web Token encryption key          |
| [`DB_URL`](#database)              | `127.0.0.1:6379` | Database URL                           |
| [`DB_PASS`](#database)             |                  | Database password                      |
| [`CONNECTION_RETRY`](#database)    | `20`             | Number of database reconnection trials |
| [`EXPIRE_ROOMS`](#cleanup)         | `86400` = 1 day  | Number of seconds to keep open rooms   |
| [`AGGRESSIVE_CLEANUP`](#cleanup)   | `false`          | Whether to perform aggressive cleanup  |
| [`CLEANUP_INTERVAL`](#cleanup)     | `false`          | Length in seconds of cleanup interval  |

Check out the [example .env](https://github.com/umcconnell/destroyer2/blob/master/.env.example) file for a concrete example configuration.

### Web Server

-   `PORT` - The port to serve the project on. Default is `8080`.
-   `HTTP_SERVER_ERROR` - The error code to print out when encountering a
    generic internal server error. Default is `500`.

### JWT

-   `JWT_KEY` - <abbr title="JSON Web Token">JWT</abbr> encryption key.

    ::: warning
    This key should definitely be specified in production and kept secret!
    :::

See the [Auth](./auth) docs for more information.

### Database

-   `DB_URL` - The Redis database url the server should connect to. You may also
    specify `REDIS_URL` as an alias to this key. If left empty, the server tries
    connecting to the default url `127.0.0.1:6379`.
-   `DB_PASS` - The Redis database password. You may also specify `REDIS_PASS`
    as an alias to this key.

    ::: tip
    When using a password, you must add it to the `.env` file **and** to the
    Redis configuration file. To set a password on the database, put this line
    into your `redis.conf` config file:  
    `requirepass "<Your Super Secret Password>"`.
    :::

-   `CONNECTION_RETRY` - Number of times to retry establishing a connection to
    the database if the connection breaks. Default is `20`. Note that this
    flag **only takes effect in production** (when `NODE_ENV` is set to
    `"production"`).

### Cleanup

-   `EXPIRE_ROOMS` - Number of seconds to keep open rooms before deleting them.
    Default is `86400` seconds (= 1 day).

-   `AGGRESSIVE_CLEANUP` - Whether to perform aggressive cleanup, i.e.
    activating Redis keyspace-event listeners. Default is `false`.

    ::: warning
    Keyspace-event listeners are only available since Redis 2.8.0 and might not
    work in every environment such as Heroku.
    :::

-   `CLEANUP_INTERVAL` - Interval length in seconds, after which passive cleanup
    is activated by calling the openrooms endpoint. Default is `false`.

See the [Cleanup](./cleanup) docs for more information.

## Logging

You can customize the log formats in `/helpers/logger.js`. The `config` variable
is worth mentioning here, as it contains the basic configuration for the file
and console transports.

For example, you could output the file logs in prettyprinted JSON with
timestamps:

```diff{10,11,12,13}
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
