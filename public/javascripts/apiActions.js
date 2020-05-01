// Helpers
const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
};

const JWT = (jwt) => `Bearer ${jwt}`;

async function parseOrThrow(resp) {
    let json = await resp.json();
    if (!resp.ok) throw `${resp.status} ${resp.statusText}: ${json.error}`;
    else if (json.message) return json.message;
    return json;
}

// Main
// GET /api/openrooms
async function openRooms(lastmodified = false) {
    let modifiedHeaders = lastmodified
        ? { "If-Modified-Since": lastmodified }
        : {};

    const resp = await fetch("/api/openrooms", {
        headers: { ...modifiedHeaders, ...headers }
    });

    lastmodified = resp.headers.get("Modified-Since");
    if (resp.status === 304) return { lastmodified, rooms: false };
    let json = await resp.json();
    if (!resp.ok) throw `${resp.status} ${resp.statusText}: ${json.error}`;
    else return { lastmodified, rooms: json };
}

// POST /api/login
async function login(userName) {
    const resp = await fetch("/api/login", {
        method: "post",
        headers,
        body: JSON.stringify({ userName })
    });
    return parseOrThrow(resp);
}

// POST /api/newroom
async function newRoom(user, roomName, secret = false) {
    const resp = await fetch("/api/newroom", {
        method: "post",
        headers: {
            ...headers,
            Authorization: JWT(user)
        },
        body: JSON.stringify({ roomName, secret })
    });
    return parseOrThrow(resp);
}

// DELETE /api/deleteroom
async function deleteRoom(user, roomId) {
    const resp = await fetch("/api/deleteroom", {
        method: "delete",
        headers: {
            ...headers,
            Authorization: JWT(user)
        },
        body: JSON.stringify({ roomId })
    });
    return parseOrThrow(resp);
}

export { openRooms, login, newRoom, deleteRoom };
