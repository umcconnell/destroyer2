let {
    sanitizeHTMLString,
    desanitizeHTMLString
} = require("../../helpers/stringSanitization");

const middleware = prop => {
    return (req, res, next) => {
        for (const key of Object.keys(req[prop])) {
            const value = req[prop][key];
            // Desanitize before sanitizing to prevent double-sanitization
            req[prop][key] = sanitizeHTMLString(desanitizeHTMLString(value));
        }

        next();
    };
};

module.exports = middleware;
