import db from "#db/db";
import { pub } from "#db/pubsub";
import { key } from "#helpers/helpers";
import { chunk, zipObj, toBool, isEmptyObject } from "#helpers/utils";

let roomKey = key("room");

function trackOpenRooms(id, remove = false) {
    return Promise.all([
        remove
            ? db.sRem("openrooms", roomKey(id))
            : db.sAdd("openrooms", roomKey(id)),
        remove
            ? db.persist(roomKey(id))
            : db.expire(
                  roomKey(id),
                  process.env.EXPIRE_ROOMS || 86400 // 1 day
              ),
        db.set("rooms:lastmodified", new Date().toUTCString())
    ]);
}

// Exists
export function exists(id) {
    return db.exists(roomKey(id)).then(toBool);
}

// CRUD
// Create
export function create(id, room) {
    return Promise.all([
        db.sendCommand([
            "HMSET",
            roomKey(id),
            ...Object.entries(room)
                .map(([k, v]) => [k, String(v)])
                .flat()
        ]),
        open(id)
    ]);
}

// Read
export function read(id) {
    return db
        .hGetAll(roomKey(id))
        .then((res) => (isEmptyObject(res) ? undefined : res));
}

// Update
export function hasVal(id, prop) {
    return db.hExists(roomKey(id), prop).then(toBool);
}

export function getVal(id, prop) {
    return db.hGet(roomKey(id), prop);
}

export function setVal(id, prop, val) {
    // Returns true if a field was updated and false if a field was added
    return db.hSet(roomKey(id), prop, val).then(!toBool);
}

export function delVal(id, prop) {
    return db.hDel(roomKey(id), prop).then(toBool);
}

// Delete
export function remove(id) {
    pub.publish("deleteroom", id);
    return Promise.all([db.del(roomKey(id)), trackOpenRooms(id, true)]);
}

export function untrack(id) {
    return trackOpenRooms(id, true);
}

// Open room
export function open(id) {
    return Promise.all([
        db.hSet(roomKey(id), "open", "1"),
        db
            .hGet(roomKey(id), "secret")
            .then(toBool)
            .then((secret) => {
                if (!secret) return trackOpenRooms(id);
                else {
                    // Also expire secret rooms
                    return db.expire(
                        roomKey(id),
                        String(process.env.EXPIRE_ROOMS || 86400) // 1 day
                    );
                }
            })
    ]).then(() => true);
}

// Close room
export async function close(id) {
    await Promise.all([
        db.hSet(roomKey(id), "open", "0"),
        trackOpenRooms(id, true)
    ]);
    return true;
}

// Return open rooms
export function getOpenRooms() {
    return db
        .sendCommand([
            "SORT",
            "openrooms",
            "ALPHA",
            "BY",
            "*->name",
            "GET",
            "#",
            "GET",
            "*->name",
            "GET",
            "*->owner"
        ])
        .then((values) => {
            const chunks = chunk(values, 3);

            let result = [];

            for (let [id, name, owner] of chunks) {
                id = id.substring(5);
                // Case: room expired
                if (owner === null && name === null) {
                    remove(id);
                } else {
                    result.push(
                        zipObj(["id", "name", "owner"], [id, name, owner])
                    );
                }
            }
            return result;
        });
}

export function roomsLastModified() {
    return db.get("rooms:lastmodified");
}
