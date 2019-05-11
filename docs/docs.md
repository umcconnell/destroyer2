# Destroyer2 docs

## Table of Contents

-   [Architecture](#architecture)
-   [API](#api)
-   [Game Events](#game-events)
-   [Customizing](#customizing)

## Architecture

Server architecture

```
               +-----------+
               |           |
               |   Redis   |
          +----+           +-----+
          |    |           |     |
          |    |           |     |
          |    +-----------+     |
          |                      |
          |                      |
+---------+----------+-----------+---------+
|                    |                     |
|   frontend-server  |    game server      |
|                    |                     |
|   - API            |    - Rooms          |
|   - Serve Files    |    - Game Events    |
|                    |                     |
|                    |                     |
+--------------------+---------------------+

```

User-Server-Interaction flowchart

```
   USERS                                             SERVER

+----------------+  /api/login                       +------------------------------+
|                +----------------------------------->                              |
| USER A:        <-----------------------------------+ USER A registration          |
| {              | token <UUID>                      |                              |
| userName,      |                                   |                              |
| id: loginToken | /api/newroom                      |                              |
| }              +-----------------------------------> USER A authentication +      |
|                <-----------------------------------+ new Room                     |
|                | token <UUID>                      |                              |
|                |                                   |                              |
|                | ws://location/?t=<UUID>&r=<UUID>  |                              |
|                +-----------------------------------> USER A authentication +      |
|                <-----------------------------------+ add to room if open          |
|                | ws connection or close            |                              |
+----------------+                                   |                              |
                                                     |                              |
+----------------+  /api/login                       |                              |
|                +----------------------------------->                              |
| USER B:        <-----------------------------------+ USER B registration          |
| {              | token <UUID>                      |                              |
| userName,      |                                   |                              |
| id: loginToken | /api/openrooms                    |                              |
| }              +-----------------------------------> Open rooms                   |
|                <-----------------------------------+ Here: room of USER A         |
|                | openrooms <ARRAY>                 |                              |
|                |                                   |                              |
|                | ws://location/?t=<UUID>&r=<UUID>  |                              |
|                +-----------------------------------> USER B authentication        |
|                <-----------------------------------+ Join room of USER A          |
|                | ws connection or close            |                              |
+----------------+                                   +------------------------------+
```

## API

Following endpoints are exposed:

### Open rooms

Returns json data about open / available rooms

-   **URL**

    /api/openrooms

-   **Method:**

    `GET`

-   **URL Params**

    None

-   **Data Params**

    `if-modified-since=[UTC String]` <br>
    (see: mdn.io/If-Modified-Since)

-   **Success Response:**

    -   **Code:** 200 <br>
        **Content:** `[{id: <UUID>, name: <String>, owner: <String>}]`

-   **Error Response:**

    -   **Code:** 500 <br>
        **Content:** `{ error : "Internal Server Error" }`

-   **Sample Call:**

    ```javascript
    fetch("/api/openrooms", {
        headers: {
            Accept: "application/json"
        }
    }).then(
        console.log
    );
    ```

## Game Events

## Customizing

By adding a `.env` file and a redis configuration file (`redis.conf`) in the `db/` folder, you can customize your setup.

You can use following values in the `.env` file:

-   `PORT` - The port to serve the project on
-   `HTTP_SERVER_ERROR` - The error code to print out when encountering a server error
-   `DB_PASS` - The redis database password

**Note:** When using a password you must add it to the `.env` file **and** to the redis configuration file
