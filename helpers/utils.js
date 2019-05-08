exports.pipe = arr => start =>
    arr.reduce((acc, curr, i) => curr(acc, i), start);

exports.chunk = function(array, amount) {
    return Array(Math.ceil(array.length / amount))
        .fill()
        .map((_, i) => array.slice(i * amount, i * amount + amount));
};

exports.findOccurrences = function(it, search) {
    let result = [],
        counter = 0;

    for (let el of it) {
        if (el === search) result.push(el) && counter++;
    }
    return result;
};

exports.replaceAt = function(string, index, replacement) {
    return (
        string.substr(0, index) +
        replacement +
        string.substr(index + replacement.length)
    );
};

exports.zipObj = function(fields, values) {
    let result = {};
    fields.forEach((field, i) => (result[field] = values[i]));
    return result;
};

exports.toBool = val => {
    switch (val) {
        case 1:
        case "1":
        case "true":
        case true:
        case "yes":
        case "on":
            return true;

        default:
            return false;
    }
};
