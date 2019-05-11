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

## Field Representation

The battleship sea/field is represented as a string with the length 100 (10x10). The first ten letters/numbers correspond to the first row (A-row). So for example the letter/number at index 24 (starting at 0) corresponds to C5 (0-9 A-row, 10-19 B-row, 20-29 C-row).

Different field/sea states are represented in the following way:

-   `0` - Empty field
-   `1` - Hit field
-   `2` - Miss field
-   `A` - Aircraft carrier (size: 5)
-   `B` - Battleship (size: 4)
-   `C` - Cruiser (size: 3)
-   `D` - Submarine (size: 3)
-   `E` - Destroyer (size: 2)

## API

A quick overview of the available API endpoints:

| HTTP Method | URL             | Description                         | Parameters                                  |
| ----------- | --------------- | ----------------------------------- | ------------------------------------------- |
| GET         | /api/openrooms  | Get an array of open rooms          | none                                        |
| POST        | /api/login      | Logs a user in and generates a uuid | userName                                    |
| POST        | /api/newroom    | Creates a new (private) room        | userId, userName, roomName, [private=false] |
| DELETE      | /api/deleteroom | Deletes a room and kicks players    | userId, userName, roomName                  |
| DELETE      | /api/logout     | Logs a user out                     | userId                                      |

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
    }).then(console.log);
    ```

### Login

Logs a user in and returns a uuid

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

-   **Notes**: As HTML special characters (& < > " ' /) are escaped, this causes a username with less or equal than 20 characters and one or more special characters to be potentially longer than 20 characters, causing a validation error.

### New Room

Creates a new room and returns a uuid for the room

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

Deletes a room and kicks players if players in room

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

Logs a user out

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

All events are emitted over the websocket connection as JSON strings in the following form:

```json
{
    "type": "<String>",
    "msg": "<(JSON )String>"
}
```

Following events are emitted:

### Error

Generic error event

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

### Place

Place a user's game field/sea

-   **Type:** <br>
    `place`
-   **Message:** <br>
    `<Game Field String>` (see: [Field Representation](#field-representation)
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

Indicates user has successfully placed his ships

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

### Ready

Indicates that the room is ready and the client should show the game interface

-   **Type:** <br>
    `ready`
-   **Message:** <br>
    <String>
-   **Emitted By:** <br>
    `server`
-   **Sample Message:**

    ```json
    {
        "type": "ready",
        "msg": "opponent placed his ships"
    }
    ```

### Fire

Fire at enemy's game field. Off-turn fires are ignored.

-   **Type:** <br>
    `ready`
-   **Message:** <br>
    <String field coordinates: [A-J][1-10]>
-   **Emitted By:** <br>
    `user`
-   **Success Response:**
    TODO: add links

    -   hit with you = false

    OR

    -   sunk with you = false

    OR

    -   miss with you = false

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

### Fire object

Some events (hit, sunk, miss) use a hit object to transmit information about a user's shot/fire

It has following properties:

-   `you`: <Boolean> - Indicates whether one of your ships was hit/sunk/missed (true if enemy fired, false if you fired)
-   `coords`: <Coordinates [A-J][1-10]> - Represents the coordinates of the shot

## Customizing

By adding a `.env` file and a redis configuration file (`redis.conf`) in the `db/` folder, you can customize your setup.

You can use following values in the `.env` file:

-   `PORT` - The port to serve the project on
-   `HTTP_SERVER_ERROR` - The error code to print out when encountering a server error
-   `DB_PASS` - The redis database password

**Note:** When using a password you must add it to the `.env` file **and** to the redis configuration file
