exports.sanitizeHTMLString = function(input) {
    if (input === "" || typeof input !== "string") return input;
    const mapping = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "/": "&#x2F;"
    };
    return input.replace(/[&<>"'\/]/g, chara => mapping[chara]);
};
exports.cleanUTFString = function(input) {
    let output = "";
    for (let i = 0; i < input.length; i++) {
        if (input.charCodeAt(i) <= 127) {
            output += input.charAt(i);
        }
    }
    return output;
};
