let db = require("../db/db");
let { key } = require("../helpers/helpers");
let { toBool } = require("../helpers/utils");

let userKey = key("user");

// Exists
exports.exists = function(id) {
    return db.existsAsync(userKey(id)).then(toBool);
};

// CRUD:
// Create
exports.create = function(id, name) {
    return db
        .setnxAsync(userKey(id), name)
        .then(toBool)
        .then(bool => {
            if (!bool) throw new Error("User already exists");
            else return bool;
        });
};

// Read
exports.get = exports.read = function(id) {
    return db.getAsync(userKey(id));
};

// Auth
exports.auth = function(name, id) {
    return db.getAsync(userKey(id)).then(uname => uname === name);
};

// Update
exports.set = exports.update = function(id, newVal) {
    return db.setAsync(userKey(id), newVal);
};

// Delete
exports.delete = function(id) {
    return db.delAsync(userKey(id)).then(toBool);
};
