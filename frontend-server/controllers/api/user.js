let { uuid } = require("@helpers/helpers");
let { sign } = require("@helpers/auth");

exports.login = async function(req, res, errorHandler) {
    try {
        const { userName } = req.body;

        const token = await sign({ userId: uuid(), userName });
        res.status(200).json({ token });
    } catch (e) {
        errorHandler(e);
    }
};
