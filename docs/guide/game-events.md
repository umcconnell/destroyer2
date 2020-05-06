# Game Events

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

## Error

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

## Join

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

## Leave

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

## Place

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

## Placed

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

## Already Placed

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
        "msg": "02012000000001000D000001000D000001000D00000100000000000000000020000CCC0000000000BBBB00000000000000EE;1111000000020000000000000000000000200000000000000000000000000020000000000000000000000002000000000000"
    }
    ```

## Count

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

## Ready

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

## Turn

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

## Fire

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

## Hit

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

## Sunk

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

## Miss

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

## Game Over

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

## Kick

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

## Reset

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

## Fire object

Some events (hit, sunk, miss) use a hit object to transmit information about a
user's shot/fire.

It has following properties:

-   `you`: `<Boolean>` - Indicates whether one of your ships was hit/sunk/missed
    (true if enemy fired, false if you fired)
-   `coords`: `<Coordinates [A-J][1-10]>` - Represents the coordinates of the shot
