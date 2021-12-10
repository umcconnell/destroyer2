const mapping = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;"
};

const sanitizeRegexp = new RegExp(`[${Object.keys(mapping).join("")}]`, "g");

const desanitizeRegexp = new RegExp(
    "(" +
        Object.values(mapping)
            .map((val) => `(${val})`)
            .join("|") +
        ")",
    "g"
);

export function sanitizeHTMLString(input) {
    if (input === "" || typeof input !== "string") return input;
    return input.replace(sanitizeRegexp, (chara) => mapping[chara]);
}

export function desanitizeHTMLString(input) {
    if (input === "" || typeof input !== "string") return input;

    return input.replace(
        desanitizeRegexp,
        (group) =>
            Object.entries(mapping).find((entry) => (entry[1] = group))[0]
    );
}

export function cleanUTFString(input) {
    let output = "";
    for (let i = 0; i < input.length; i++) {
        if (input.charCodeAt(i) <= 127) {
            output += input.charAt(i);
        }
    }
    return output;
}
