import { STATUS_CODES } from "http";
import { messageSchemas } from "#models/schemas";

export function heartbeat() {
    this.isAlive = true;
}

export function noop() {}

export function rejectWs(ws) {
    return ws.send(messageSchemas("error", "invalid input"));
}

// Taken from the ws library
// https://github.com/websockets/ws/blob/08c6c8ba70404818f7f4bc23eb5fd0bf9c94c039/lib/websocket-server.js#L384-L406
export function abortHandshake(socket, code = 500, message, headers) {
    if (socket.writable) {
        message = message || STATUS_CODES[code];
        headers = {
            Connection: "close",
            "Content-Type": "text/html",
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
}
