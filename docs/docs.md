# Destroyer2 docs

## Table of Contents

-   [Architecture](#architecture)
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

## Customizing

By adding a `.env` file and a redis configuration file (`redis.conf`) in the `db/` folder, you can customize your setup.

You can use following values in the `.env` file:

-   `PORT` - The port to serve the project on
-   `HTTP_SERVER_ERROR` - The error code to print out when encountering a server error
-   `DB_PASS` - The redis database password

**Note:** When using a password you must add it to the `.env` file **and** to the redis configuration file
