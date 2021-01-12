let crypto = require("crypto");

exports.uuid = function uuid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
        /[018]/g,
        (a) =>
            (a ^ ((crypto.randomBytes(1)[0] * 16) >> (a / 4))).toString(16)[0]
    );
};

exports.key = function (key) {
    return function (id) {
        return `${key}:${id}`;
    };
};
