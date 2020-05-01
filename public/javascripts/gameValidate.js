const shipSizes = {
    A: 5,
    B: 4,
    C: 3,
    D: 3,
    E: 2
};

const ships = ["A", "B", "C", "D", "E"];

function validShipPlacement(type, placements, length = true) {
    return (
        (length ? placements.length === shipSizes[type] : true) &&
        // Check for vertically placed ships
        (placements.slice(1).every((el, i) => el - 10 === placements[i]) ||
            // OR horizontally placed ships
            placements.slice(1).every(
                (el, i) =>
                    // Check if ships are in the same row
                    Math.floor(el / 10) === Math.floor(placements[i] / 10) &&
                    el === placements[i] + 1
            ))
    );
}

function validGameField(field) {
    if (field.length !== 100)
        return { valid: false, msg: "Field must be 10x10" };
    else if (!/[A-E0-2]/g.test(field.join("")))
        return { valid: false, msg: "Field contains illegal characters" };
    else {
        let shipMap = [...ships.slice().map(el => [el, []])].reduce(
            (obj, { 0: key, 1: val }) => Object.assign(obj, { [key]: val }),
            {}
        );

        // Save ship positions / indizes
        field.forEach((ship, index) => {
            if (/[A-E]/g.test(ship)) {
                shipMap[ship].push(index);
            }
        });

        let allShips = Object.values(shipMap).every(el => el !== []);
        let shipsValidity = Object.entries(shipMap)
            .sort()
            .map(entry => validShipPlacement(...entry));

        if (!allShips)
            return { valid: false, msg: "Amount of ships must be 5" };
        else if (!shipsValidity.every(el => el))
            return {
                valid: false,
                msg: `Ship(s) ${ships
                    .map((letter, i) => (shipsValidity[i] ? false : letter))
                    .filter(el => el)
                    .join(", ")} is / are invalid`
            };
        else return { valid: true };
    }
}

export { validGameField, validShipPlacement };
