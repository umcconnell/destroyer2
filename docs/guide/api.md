# API

A quick overview of the available API endpoints:

| HTTP Method | URL             | Description                                                          | Parameters                                                         | Requires Auth |
| ----------- | --------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------- |
| GET         | /api/openrooms  | Get an array of open rooms                                           | none                                                               | No            |
| POST        | /api/login      | Log a user in and generate a <abbr title="JSON Web Token">JWT</abbr> | userName                                                           | No            |
| POST        | /api/newroom    | Create a new (private) room                                          | <abbr title="JSON Web Token">JWT</abbr>, roomName, [private=false] | Yes           |
| DELETE      | /api/deleteroom | Delete a room and kick out players                                   | <abbr title="JSON Web Token">JWT</abbr>, roomId                    | Yes           |

::: tip
The <abbr title="JSON Web Token">JWT</abbr> authorization token has to be passed
in the `Authorization` header (see
[RFC 6750](https://tools.ietf.org/html/rfc6750)) of HTTP requests that require
auth.

The header should look like this: `Authorization: Bearer <JWT>`.<br>
See below for more examples on how to call the API.
:::

Following endpoints are exposed:

## Open Rooms

Return json data about open / available rooms.

-   **URL**

    `/api/openrooms`

-   **Method:**

    `GET`

-   **URL Params**

    None

-   **Data Params**

    **Optional:**

    -   `if-modified-since=[UTC String]` <br>
        (see: [mdn.io/If-Modified-Since](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Modified-Since))

-   **Success Response:**

    -   **Code:** 200 <br>
        **Content:** `[{id: <UUID>, name: <String>, owner: <String>}, ...]`

    OR

    -   **Code:** 304 (Content not Modified)

-   **Error Response:**

    -   **Code:** 500 <br>
        **Content:** `{ error : "Internal Server Error" }`

-   **Sample Call:**

    ```javascript
    fetch("/api/openrooms", {
        headers: {
            Accept: "application/json",
            "If-Modified-Since": "Fri, 14 Mar 2015 09:26:53 GMT"
        }
    }).then(console.log);
    ```

## Login

Log a user in and return a <abbr title="JSON Web Token">JWT</abbr> containing
the username und uuid. The <abbr title="JSON Web Token">JWT</abbr> is
**valid for one day**.

-   **URL**

    `/api/login`

-   **Method:**

    `POST`

-   **URL Params**

    None

-   **Data Params**

    **Required:**

    -   `userName=<String maxlength 20>`

-   **Success Response:**

    -   **Code:** 200 <br>
        **Content:** `{ token : <JWT token string> }`

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
            userName: <Username>
        })
    }).then(console.log);
    ```

## New Room

Create a new room and return a uuid for the room. This endpoints
**requires auth**.

-   **URL**

    `/api/newroom`

-   **Method:**

    `POST`

-   **URL Params**

    None

-   **Data Params**

    **Required:**

    -   `roomName=<String maxlength 20>`

    **Optional:**

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
            "Content-Type": "application/json",
            Authorization: "Bearer <JWT>"
        },
        body: JSON.stringify({
            roomName: <ROOMNAME>
            // secret: true
        })
    }).then(console.log);
    ```

## Delete Room

Delete a room and kick out any players still in the room. This endpoints
**requires auth**.

-   **URL**

    `/api/deleteroom`

-   **Method:**

    `DELETE`

-   **URL Params**

    None

-   **Data Params**

    **Required:**

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
            "Content-Type": "application/json",
            Authorization: "Bearer <JWT>"
        },
        body: JSON.stringify({
            roomId: <ROOMID>
        })
    }).then(console.log);
    ```
