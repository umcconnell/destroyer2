export function pipe(arr) {
    return (start) => arr.reduce((acc, curr, i) => curr(acc, i), start);
}

export function chunk(array, amount) {
    return Array(Math.ceil(array.length / amount))
        .fill()
        .map((_, i) => array.slice(i * amount, i * amount + amount));
}

export function findOccurrences(it, search) {
    let result = [],
        counter = 0;

    for (let el of it) {
        if (el === search) result.push(el) && counter++;
    }
    return result;
}

export function replaceAt(string, index, replacement) {
    return (
        string.substr(0, index) +
        replacement +
        string.substr(index + replacement.length)
    );
}

export function zipObj(fields, values) {
    let result = {};
    fields.forEach((field, i) => (result[field] = values[i]));
    return result;
}

export function toBool(val) {
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
}

export function isEmptyObject(obj) {
    return obj && Object.keys(obj).length === 0;
}
