let root = require("app-root-path");

let { verify } = require(`${root}/helpers/auth`);

function reject(res) {
    res.status(403).json({ error: "unauthorized" });
}

const middleware = (req, res, next) => {
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
};

module.exports = middleware;
