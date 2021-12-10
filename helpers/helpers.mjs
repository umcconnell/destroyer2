import { randomBytes } from "crypto";

export function uuid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
        /[018]/g,
        (a) => (a ^ ((randomBytes(1)[0] * 16) >> (a / 4))).toString(16)[0]
    );
}

export function key(key) {
    return function (id) {
        return `${key}:${id}`;
    };
}
