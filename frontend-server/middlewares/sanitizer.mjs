import {
    sanitizeHTMLString,
    desanitizeHTMLString
} from "#helpers/stringSanitization";

export default function middleware(prop) {
    return (req, res, next) => {
        for (const key of Object.keys(req[prop])) {
            const value = req[prop][key];
            // Desanitize before sanitizing to prevent double-sanitization
            req[prop][key] = sanitizeHTMLString(desanitizeHTMLString(value));
        }

        next();
    };
}
