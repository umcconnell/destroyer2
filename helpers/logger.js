let winston = require("winston");

let log = console.log;
let cmd = {
    // CMDs
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    // Colors
    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",
    // Background
    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m"
};

module.exports = {
    log() {
        return log.apply(this, arguments);
    },
    warn() {
        return log.apply(this, [
            cmd.FgYellow,
            "\u26A0 ",
            ...arguments,
            cmd.reset
        ]);
    },
    error() {
        return log.apply(this, [cmd.FgRed, "\u26A0 ", ...arguments, cmd.reset]);
    },
    info() {
        return log.apply(this, [
            cmd.FgGreen,
            "\uD83D\uDEC8 ",
            ...arguments,
            cmd.reset
        ]);
    }
};
