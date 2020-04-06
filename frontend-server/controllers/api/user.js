let root = require("app-root-path");

let jwt = require("jsonwebtoken");
let { uuid } = require(`${root}/helpers/helpers`);
const JWT_KEY = process.env.JWT_KEY;

if (!JWT_KEY) logger.error("NO JSON WEB TOKEN KEY SPECIFIED!");

exports.login = async function (req, res, errorHandler) {
    try {
        const { userName } = req.body;

        jwt.sign(
            {
                userId: uuid(),
                userName
            },
            JWT_KEY,
            { algorithm: "HS256" },
            (err, token) => {
                if (err) errorHandler(err);
                res.status(200).json({ token });
            }
        );
    } catch (e) {
        errorHandler(e);
    }
};
