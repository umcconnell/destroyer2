const { STATUS_CODES } = require("http");
let root = require("app-root-path");
let { messageSchemas } = require(`${root}/models/schemas`);

exports.heartbeat = function () {
    this.isAlive = true;
};

exports.noop = () => {};

exports.rejectWs = (ws) => ws.send(messageSchemas("error", "invalid input"));

// Taken from the ws library
// https://github.com/websockets/ws/blob/08c6c8ba70404818f7f4bc23eb5fd0bf9c94c039/lib/websocket-server.js#L384-L406
exports.abortHandshake = (socket, code = 500, message, headers) => {
    if (socket.writable) {
        message = message || STATUS_CODES[code];
        headers = {
            Connection: "close",
            "Content-type": "text/html",
            "Content-Length": Buffer.byteLength(message),
            ...headers
        };

        socket.write(
            `HTTP/1.1 ${code} ${STATUS_CODES[code]}\r\n` +
                Object.keys(headers)
                    .map((h) => `${h}: ${headers[h]}`)
                    .join("\r\n") +
                "\r\n\r\n" +
                message
        );
    }

    try {
        socket.removeListener("error", socketOnError);
    } catch (e) {}
    socket.destroy();
};
