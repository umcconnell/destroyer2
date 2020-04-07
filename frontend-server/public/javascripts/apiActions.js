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
function openRooms(lastmodified = false) {
    let modifiedHeaders = lastmodified
        ? { "If-Modified-Since": lastmodified }
        : {};

    return fetch("/api/openrooms", {
        headers: { ...modifiedHeaders, ...headers }
    }).then(async (resp) => {
        let lastmodified = resp.headers.get("Modified-Since");

        if (resp.status === 304) return { lastmodified, rooms: false };
        let json = await resp.json();
        if (!resp.ok) throw `${resp.status} ${resp.statusText}: ${json.error}`;
        else return { lastmodified, rooms: json };
    });
}

// POST /api/login
function login(userName) {
    return fetch("/api/login", {
        method: "post",
        headers,
        body: JSON.stringify({ userName })
    }).then(parseOrThrow);
}

// POST /api/newroom
function newRoom(user, roomName, secret = false) {
    return fetch("/api/newroom", {
        method: "post",
        headers: {
            ...headers,
            Authorization: JWT(user)
        },
        body: JSON.stringify({ roomName, secret })
    }).then(parseOrThrow);
}

// DELETE /api/deleteroom
function deleteRoom(user, roomId) {
    return fetch("/api/deleteroom", {
        method: "delete",
        headers: {
            ...headers,
            Authorization: JWT(user)
        },
        body: JSON.stringify({ roomId })
    }).then(parseOrThrow);
}

export { openRooms, login, newRoom, deleteRoom };
