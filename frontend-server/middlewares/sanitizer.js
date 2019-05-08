let { sanitizeHTMLString } = require("../../helpers/stringSanitization");

const middleware = prop => {
    return (req, res, next) => {
        for (const key of Object.keys(req[prop])) {
            const value = req[prop][key];
            req[prop][key] = sanitizeHTMLString(value);
        }

        next();
    };
};

module.exports = middleware;
