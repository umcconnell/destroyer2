const mapping = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;"
};

const desanitizeRegexp = new RegExp(
    "(" +
        Object.values(mapping)
            .map((val) => `(${val})`)
            .join("|") +
        ")",
    "g"
);

exports.sanitizeHTMLString = function (input) {
    if (input === "" || typeof input !== "string") return input;
    return input.replace(/[&<>"'\/]/g, (chara) => mapping[chara]);
};

exports.desanitizeHTMLString = function (input) {
    if (input === "" || typeof input !== "string") return input;

    return input.replace(
        desanitizeRegexp,
        (group) =>
            Object.entries(mapping).find((entry) => (entry[1] = group))[0]
    );
};

exports.cleanUTFString = function (input) {
    let output = "";
    for (let i = 0; i < input.length; i++) {
        if (input.charCodeAt(i) <= 127) {
            output += input.charAt(i);
        }
    }
    return output;
};
