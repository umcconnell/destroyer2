let root = require("app-root-path");

let db = require(`${root}/db/db`);
let { pub } = require(`${root}/db/pubsub`);
let { key } = require(`${root}/helpers/helpers`);
let { chunk, zipObj, toBool } = require(`${root}/helpers/utils`);

let roomKey = key("room");

function trackOpenRooms(id, remove = false) {
    return Promise.all([
        remove
            ? db.sremAsync("openrooms", roomKey(id))
            : db.saddAsync("openrooms", roomKey(id)),
        remove
            ? db.persistAsync(roomKey(id))
            : db.expireAsync(
                  roomKey(id),
                  process.env.EXPIRE_ROOMS || 86400 // 1 day
              ),
        db.setAsync("rooms:lastmodified", new Date().toUTCString())
    ]);
}

// Exists
exports.exists = function (id) {
    return db.existsAsync(roomKey(id)).then(toBool);
};

// CRUD
// Create
exports.create = exports.new = function (id, room) {
    return Promise.all([
        db.hmsetAsync(roomKey(id), room).then(toBool),
        toBool(room.secret) ? "" : trackOpenRooms(id)
    ]);
};

// Read
exports.get = exports.read = function (id) {
    return db.hgetallAsync(roomKey(id));
};

// Update
exports.hasVal = exports.has = function (id, prop) {
    return db.hexistsAsync(roomKey(id), prop).then(toBool);
};

exports.getVal = exports.readVal = function (id, prop) {
    return db.hgetAsync(roomKey(id), prop);
};

exports.setVal = exports.update = function (id, prop, val) {
    // Returns true if a field was updated and false if a field was added
    return db.hsetAsync(roomKey(id), prop, val).then(!toBool);
};

exports.delVal = function (id, prop) {
    return db.hdelAsync(roomKey(id), prop).then(toBool);
};

// Delete
exports.delete = function (id) {
    pub.publish("deleteroom", id);
    return Promise.all([db.delAsync(roomKey(id)), trackOpenRooms(id, true)]);
};

exports.untrack = function (id) {
    return trackOpenRooms(id, true);
};

// Open room
exports.open = function (id) {
    return Promise.all([
        db.hsetAsync(roomKey(id), "open", 1),
        db
            .hgetAsync(roomKey(id), "secret")
            .then(toBool)
            .then((secret) => {
                if (!secret) return trackOpenRooms(id);
                else return true;
            })
    ]).then(() => true);
};

// Close room
exports.close = function (id) {
    return Promise.all([
        db.hsetAsync(roomKey(id), "open", 0),
        trackOpenRooms(id, true)
    ]).then(() => true);
};

// Return open rooms
exports.openRooms = function () {
    return db
        .sortAsync(
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
        )
        .then((values) =>
            chunk(values, 3).map((group) => {
                group[0] = group[0].substring(5);
                return zipObj(["id", "name", "owner"], group);
            })
        );
};

exports.roomsLastModified = function () {
    return db.getAsync("rooms:lastmodified");
};
