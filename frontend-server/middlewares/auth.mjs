import { verify } from "#helpers/auth";

function reject(res) {
    res.status(401).json({ error: "unauthorized" });
}

export default function middleware(req, res, next) {
    let [type, token] = (req.get("Authorization") || "").split(" ");

    if (type && type == "Bearer" && token) {
        verify(token)
            .then((decoded) => {
                req.user = decoded;
                next();
            })
            .catch(() => reject(res));
    } else {
        reject(res);
    }
}
