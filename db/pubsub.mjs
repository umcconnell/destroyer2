// import { createClient } from "redis";
// import reconnectStrategy from "./reconnectStrategy.mjs";

import client from "#db/db";

let pub = client.duplicate(),
    sub = pub.duplicate();

await pub.connect();
await sub.connect();

export { pub, sub };
