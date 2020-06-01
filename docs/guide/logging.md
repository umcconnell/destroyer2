# Logging

TODO: Explain default configuration

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
