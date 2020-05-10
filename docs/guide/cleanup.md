# Room Cleanup

Destroyer2 automatically lets open rooms expire after a specified time to keep
the database clean. The expiration time in seconds can be set with the
`EXPIRE_ROOMS` key in the `.env` file. The default is after 1 day. See the
[customizing section](./customizing#environment) for more information on
available environment variables.

Waiting users in an expired room are kicked out. However, rooms never expire
when they are full.

Cleaning up closed rooms in the game-server and the `openrooms` list used to
track currently playable rooms is a little more difficult. Destroyer2 uses a
multipronged approach to this problem.

## Passive Cleanup

Expired rooms are deleted from the `openrooms` list when this list is read. This
means that calls to the `api/openrooms` [endpoint](./api#open-rooms) clean up
expired but still visible zombie rooms.

However, as this endpoint is cached using the [If-Modified-Since](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Modified-Since) header, only new users
passively clean up zombie rooms. This means that existing users might join such
a room, cleaning up the room but causing a user-unfriendly connection error.

## Aggressive Cleanup

Aggressive cleanup is an optional cleanup mode, where the server actively tries
to clean up zombie rooms before a users receive an unfriendly error. This
consumes a little more ressources.

Aggressive cleanup offers two modes to actively remove expired rooms:

-   A **regular cleanup** that calls the [`openrooms`](./api#open-rooms)
    endpoint at regular intervals without cache to activate passive cleanup.
    This mode can be enabled with the `CLEANUP_INTERVAL` key in the `.env` file,
    specifying the interval in seconds, in which the endpoint should be called.

OR

-   A **notification listener mode** that activates Redis
    [keyspace-event](https://redis.io/topics/notifications) listeners to clean
    up expired rooms as soon as they are closed. This mode can be activated by
    setting the `AGGRESSIVE_CLEANUP` value in the `.env` to `true`.

    ::: warning
    Keyspace-event listeners are only available since Redis 2.8.0 and might not
    work in every environment such as Heroku.
    :::
