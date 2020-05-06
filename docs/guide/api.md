# API

TODO: Mark endpoints that require auth
TODO: Update example calls

A quick overview of the available API endpoints:

| HTTP Method | URL             | Description                        | Parameters                                  |
| ----------- | --------------- | ---------------------------------- | ------------------------------------------- |
| GET         | /api/openrooms  | Get an array of open rooms         | none                                        |
| POST        | /api/login      | Log a user in and generates a uuid | userName                                    |
| POST        | /api/newroom    | Create a new (private) room        | userId, userName, roomName, [private=false] |
| DELETE      | /api/deleteroom | Delete a room and kick out players | userId, userName, roomName                  |

Following endpoints are exposed:

## Open Rooms

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

## Login

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

## New Room

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

    -   **Code:** 401 <br>
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

## Delete Room

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

    -   **Code:** 401 <br>
        **Content:** `{ error : "unauthorized" }`

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
