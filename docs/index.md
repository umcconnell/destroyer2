# Destroyer2 docs

## Table of Contents

-   [Architecture](#architecture)
-   [Field Representation](#field-representation)
-   [API](#api)
    -   [Open Rooms](#open-rooms)
    -   [Login](#login)
    -   [New Room](#new-room)
    -   [Delete Room](#delete-room)
    -   [Logout](#logout)
-   [Game Events](#game-events)
    -   [Error](#error)
    -   [Join](#join)
    -   [Leave](#leave)
    -   [Place](#place)
    -   [Placed](#placed)
    -   [Already Placed](#already-placed)
    -   [Count](#count)
    -   [Ready](#ready)
    -   [Turn](#turn)
    -   [Fire](#fire)
    -   [Hit](#hit)
    -   [Sunk](#sunk)
    -   [Miss](#miss)
    -   [Game Over](#game-over)
    -   [Kick](#kick)
    -   [Reset](#reset)
    -   [Fire Object](#fire-object)
-   [Customizing](#customizing)
    -   [Environment](#environment)
    -   [Logging](#logging)

## Architecture

Server architecture:

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
|   frontend-server  |    game-server      |
|                    |                     |
|   - API            |    - Rooms          |
|   - Serve Files    |    - Game Events    |
|                    |                     |
|                    |                     |
+--------------------+---------------------+

```

User-Server-Interaction flowchart:

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

## Field Representation

The battleship "sea"/field is represented as a string with the length 100 (10x10).
The first ten letters/numbers correspond to the first row (A-row).
So for example the letter/number at index 24 (starting at 0) corresponds to C5
(0-9 A-row, 10-19 B-row, 20-29 C-row).

Different field/"sea" states are represented in the following way:

-   `0` - Empty field
-   `1` - Hit field
-   `2` - Miss field
-   `A` - Aircraft carrier (size: 5)
-   `B` - Battleship (size: 4)
-   `C` - Cruiser (size: 3)
-   `D` - Submarine (size: 3)
-   `E` - Destroyer (size: 2)

A game field is valid if all the ships are placed horizontally or vertically.
Ships may only be in one row or one column and may not have blanks/gaps.

## API

A quick overview of the available API endpoints:

| HTTP Method | URL             | Description                        | Parameters                                  |
| ----------- | --------------- | ---------------------------------- | ------------------------------------------- |
| GET         | /api/openrooms  | Get an array of open rooms         | none                                        |
| POST        | /api/login      | Log a user in and generates a uuid | userName                                    |
| POST        | /api/newroom    | Create a new (private) room        | userId, userName, roomName, [private=false] |
| DELETE      | /api/deleteroom | Delete a room and kick out players | userId, userName, roomName                  |
| DELETE      | /api/logout     | Log a user out                     | userId                                      |

Following endpoints are exposed:

### Open rooms

Return json data about open / available rooms.

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
    }).then(console.log);
    ```

### Login

Log a user in and return a uuid.

-   **URL**

    /api/login

-   **Method:**

    `POST`

-   **URL Params**

    None

-   **Data Params**

    **Required:**

    `userName=<String maxlength 20>`

-   **Success Response:**

    -   **Code:** 200 <br>
        **Content:** `{ userId : <UUID>, userName : <String> }`

-   **Error Response:**

    -   **Code:** 400 <br>
        **Content:** `{ error : <Validation error message> }`

    OR

    -   **Code:** 500 <br>
        **Content:** `{ error : "Internal Server Error" }`

-   **Sample Call:**

    ```javascript
    fetch("/api/login", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userName: USERNAME
        }).then(console.log)
    });
    ```

-   **Notes**: As HTML special characters (`& < > " ' /`) are escaped, this
    causes a username with 20 characters or less and one or more special
    characters to be potentially longer than 20 characters, causing a validation
    error.

### New Room

Create a new room and return a uuid for the room.

-   **URL**

    /api/newroom

-   **Method:**

    `POST`

-   **URL Params**

    None

-   **Data Params**

    **Required:**

    -   `userId=<UUID>`
    -   `userName=<String>`
    -   `roomName=<String maxlength 20>`

    **Optional**

    -   `secret=<Boolean default:false>`

-   **Success Response:**

    -   **Code:** 200 <br>
        **Content:** `{ roomId: <UUID> }`

-   **Error Response:**

    -   **Code:** 400 <br>
        **Content:** `{ error : <Validation error message> }`

    OR

    -   **Code:** 403 <br>
        **Content:** `{ error : "unauthorized" }`

    OR

    -   **Code:** 500 <br>
        **Content:** `{error: "Internal Server Error"}`

-   **Sample Call:**

    ```javascript
    fetch("/api/newroom", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: USERID,
            userName: USERNAME,
            roomName: ROOMNAME
            // secret: true
        }).then(console.log)
    });
    ```

### Delete Room

Delete a room and kick out any players still in the room.

-   **URL**

    /api/deleteroom

-   **Method:**

    `DELETE`

-   **URL Params**

    None

-   **Data Params**

    **Required:**

    -   `userId=<UUID>`
    -   `userName=<String>`
    -   `roomId=<UUID>`

-   **Success Response:**

    -   **Code:** 200 <br>
        **Content:** `{ message: "successfully deleted room" }`

-   **Error Response:**

    -   **Code:** 400 <br>
        **Content:** `{ error : <Validation error message> }`

    OR

    -   **Code:** 403 <br>
        **Content:** `{ error: "you are not the owner of this room" }`

    OR

    -   **Code:** 404 <br>
        **Content:** `{ error: "room doesn't exist" }`

    OR

    -   **Code:** 500 <br>
        **Content** `{error: "Internal Server Error"}`

-   **Sample Call:**

    ```javascript
    fetch("/api/deleteroom", {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: USERID,
            userName: USERNAME,
            roomId: ROOMID
        }).then(console.log)
    });
    ```

### Logout

Log a user out.

-   **URL**

    /api/logout

-   **Method:**

    `DELETE`

-   **URL Params**

    None

-   **Data Params**

    **Required:**

    `userId=<UUID>`

-   **Success Response:**

    -   **Code:** 200 <br>
        **Content:** `{ message: "successfully deleted user" }`

-   **Error Response:**

    -   **Code:** 400 <br>
        **Content:** `{ error : <Validation error message> }`

    OR

    -   **Code:** 404 <br>
        **Content:** `{ error: "user doesn't exist" }`

    OR

    -   **Code:** 500 <br>
        **Content** `{error: "Internal Server Error"}`

-   **Sample Call:**

    ```javascript
    fetch("/api/logout", {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: USERID
        }).then(console.log)
    });
    ```

## Game Events

All events are emitted over the websocket connection as JSON strings in the
following form:

```json
{
    "type": "<String>",
    "msg": "<(JSON )String>"
}
```

A quick overview of the available game events:

| Type            | Emitted By | Description                   | Message                                          |
| --------------- | ---------- | ----------------------------- | ------------------------------------------------ |
| `error`         | server     | Generic error event           | `<String>`                                       |
| `join`          | server     | Player (re)joined             | `<String>`                                       |
| `leave`         | server     | Player left                   | `<String>`                                       |
| `place`         | user       | Place ships                   | `<Game Field String>`                            |
| `placed`        | server     | Successfully placed ships     | `<String>`                                       |
| `alreadyPlaced` | server     | Ship placement already known  | `<Game Field String[;Game Field String]>`        |
| `count`         | server     | Unsunk ships                  | `<JSON string: {me: <Number>, enemy: <Number>}>` |
| `ready`         | server     | All players ready to play     | `<String>`                                       |
| `turn`          | server     | Player's turn                 | `<Boolean>`                                      |
| `fire`          | user       | Player's shot                 | `<Coordinate [A-J][1-10]>`                       |
| `hit`           | server     | Player's ship was hit         | `<Fire object>`                                  |
| `sunk`          | server     | Player's ships was hit & sunk | `<Fire object>`                                  |
| `miss`          | server     | Player's ship was missed      | `<Fire object>`                                  |
| `gameOver`      | server     | Game over                     | `<String>`                                       |
| `kick`          | server     | Player was kicked out         | `<String>`                                       |
| `reset`         | server     | Room was reset                | `<String>`                                       |

Following events are emitted:

### Error

Generic error event.

-   **Type:** <br>
    `error`
-   **Message:** <br>
    `<String>`
-   **Emitted By:** <br>
    `server`
-   **Sample Message:**

    ```json
    {
        "type": "error",
        "msg": "internal server error"
    }
    ```

### Join

Notifies a user another player has (re)joined the room.

-   **Type:** <br>
    `join`
-   **Message:** <br>
    `<String>`
-   **Emitted By:** <br>
    `server`
-   **Sample Message:**

    ```json
    {
        "type": "join",
        "msg": "a new player joined"
    }
    ```

### Leave

Notifies a user another player has left the room.

-   **Type:** <br>
    `leave`
-   **Message:** <br>
    `<String>`
-   **Emitted By:** <br>
    `server`
-   **Sample Message:**

    ```json
    {
        "type": "leave",
        "msg": "a player left"
    }
    ```

### Place

Place a user's game field/"sea".

-   **Type:** <br>
    `place`
-   **Message:** <br>
    `<Game Field String>` (see: [Field Representation](#field-representation))
-   **Emitted By:**)<br>
    `user`
-   **Success Response** <br>

    -   [placed](#placed)

    OR

    -   [ready](#ready)

-   **Error Response:** <br>
    -   [error](#error)
-   **Sample Message:**

    ```json
    {
        "type": "place",
        "msg": "000A000000000A000D00000A000D00000A000D00000A00000000000000000000000CCC0000000000BBBB00000000000000EE"
    }
    ```

### Placed

Indicates user has successfully placed his ships.

-   **Type:** <br>
    `placed`
-   **Message:** <br>
    `<String>`
-   **Emitted By:** <br>
    `server`
-   **Sample Message:**

    ```json
    {
        "type": "placed",
        "msg": "successfully placed ships"
    }
    ```

### Already Placed

Indicates the user has already placed his ships. Emitted when at least one
player had placed their ships (and possibly already played), one or two had left
and a player rejoined. The UI should hide the ship-placement interface and
display the game interface.

-   **Type:** <br>
    `alreadyPlaced`
-   **Message:** <br>
    `<Game Field String[;Game Field String]>`
    (see: [Field Representation](#field-representation))

    The first game field string is the user's game field. If the opponent has
    already placed his ships, the second game field string represents the
    opponent's game field. The opponent's game field string is seperated by a
    `;` from the player's game field string.

-   **Emitted By:** <br>
    `server`
-   **Sample Message:** <br>

    ```json
    {
        "type": "alreadyPlaced",
        "msg": "02012000000001000D000001000D000001000D00000100000000000000000020000CCC0000000000BBBB00000000000000EE;1111000000020000000000000000000000200000000000000000000000000020000000000000000000000002000000000000
    }
    ```

### Count

Indicates how many ships the user and the opponent have left respectively.
Sent if two players had placed their ships (and possibly already played), one or
two left, and a player rejoined. Otherwise the UI is expected to keep count
of the [sunk](#sunk) events recieved and to display a counter per player.

-   **Type:** <br>
    `count`
-   **Message:** <br>
    `<JSON string: {me: <Number>, enemy: <Number>}>`

    The message JSON object has the properties `me` and `enemy` indicating how
    many ships the users have remaining respectively.

-   **Emitted By:** <br>
    `server`
-   **Sample Message:** <br>

    ```json
    {
        "type": "count",
        "msg": "{
            \"me\": 4,
            \"enemy\": 3
        }"
    }
    ```

### Ready

Indicates that the room is ready and the client should show the game interface.

-   **Type:** <br>
    `ready`
-   **Message:** <br>
    `<JSON string: {msg: <String>, enemy: <String>}>`

    The message JSON object has the property `msg` representing a status
    message that can be displayed to the user and the property `enemy`
    indicating the opponent's/enemy's name for the UI to personalize the game.

-   **Emitted By:** <br>
    `server`
-   **Sample Message:**

    ```json
    {
        "type": "ready",
        "msg": "{
            \"msg\": \"successfully placed ships\",
            \"enemy\": \"Enemy Name\"
        }"
    }
    ```

### Turn

Indicates whether it is a player's turn.

-   **Type:** <br>
    `turn`
-   **Message:** <br>
    `<Boolean>`
-   **Emitted By:** <br>
    `server`
-   **Sample Message:**

    ```json
    {
        "type": "turn",
        "msg": true
    }
    ```

### Fire

Fire at enemy's game field. Out-of-turn fires are ignored.

-   **Type:** <br>
    `ready`
-   **Message:** <br>
    `<String field coordinates: [A-J][1-10]>`
-   **Emitted By:** <br>
    `user`
-   **Success Response:**

    -   [hit](#hit) with you = false

    OR

    -   [sunk](#sunk) with you = false

    OR

    -   [miss](#miss) with you = false

-   **Sample Message:**

    ```json
    {
        "type": "fire",
        "msg": "C4"
    }
    ```

### Hit

Indicates a player was hit.

-   **Type:** <br>
    `hit`
-   **Message:** <br>
    `<JSON string: object>` (see [fire object](#fire-object))
-   **Emitted By:** <br>
    `server`
-   **Sample Message:**

    ```json
    {
        "type": "hit",
        "msg": "{
            \"you\": true,
            \"coords\": \"C4\"
        }"
    }
    ```

### Sunk

Indicates a player's ship was hit and sunk.

-   **Type:** <br>
    `hit`
-   **Message:** <br>
    `<JSON string: object>` (see [fire object](#fire-object))
-   **Emitted By:** <br>
    `server`
-   **Sample Message:**

    ```json
    {
        "type": "sunk",
        "msg": "{
            \"you\": false,
            \"coords\": \"C4\"
        }"
    }
    ```

### Miss

Indicates a player's ship was missed.

-   **Type:** <br>
    `hit`
-   **Message:** <br>
    `<JSON string: object>` (see [fire object](#fire-object))
-   **Emitted By:** <br>
    `server`
-   **Sample Message:**

    ```json
    {
        "type": "miss",
        "msg": "{
            \"you\": true,
            \"coords\": \"C4\"
        }"
    }
    ```

### Game Over

Indicates a game is over. Resets the room state (ship placement) but players
are kept in the room. The UI should invite the user to reload/restart the game.

-   **Type:** <br>
    `gameOver`
-   **Message:** <br>
    `<String>`
-   **Emitted By:** <br>
    `server`
-   **Sample Message:**

    ```json
    {
        "type": "gameOver",
        "msg": "You win"
    }
    ```

### Kick

Indicates the owner closed the room and the user(s) shoud be redirected back
home.

-   **Type:** <br>
    `kick`
-   **Message:** <br>
    `<String>`
-   **Emitted By:** <br>
    `server`
-   **Sample Message:**

    ```json
    {
        "type": "kick",
        "msg": "owner closed room"
    }
    ```

### Reset

Emitted when two players were playing, one player left and a different player
joined (only emitted to waiting player). The UI should notify the waiting user
and reload the page.

-   **Type:** <br>
    `kick`
-   **Message:** <br>
    `<String>`
-   **Emitted By:** <br>
    `server`
-   **Sample Message:**

    ```json
    {
        "type": "reset",
        "msg": "a different player joined"
    }
    ```

### Fire object

Some events (hit, sunk, miss) use a hit object to transmit information about a
user's shot/fire.

It has following properties:

-   `you`: `<Boolean>` - Indicates whether one of your ships was hit/sunk/missed
    (true if enemy fired, false if you fired)
-   `coords`: `<Coordinates [A-J][1-10]>` - Represents the coordinates of the shot

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
