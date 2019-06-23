import { close } from "./icons.js";
import { validGameField, validShipPlacement } from "./gameValidate.js";

const Ships = {
    A: 5,
    B: 4,
    C: 3,
    D: 3,
    E: 2
};
const FieldLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
let Sea = new Array(100).fill(0);

let currentShip, currentPill;
let pills, fields;

/*=======*\
  Helpers
\*=======*/
/**
 * Generate a random integer between a minimum number (inclusive) and a maximum
 * number (inclusive)
 * @param {number} min Minimum number
 * @param {number} max Maximum number
 * @return {number} Random integer
 */
function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Creates a range between a minimum number and a maximum number
 * @param {number} min Minumum number / start of the range
 * @param {number} max Maximum number / end of the range
 * @param {number} [step=1] Difference between every element of the range
 * @return {array} Number range
 */
function range(min, max, step = 1) {
    if (min > max) step = -1 * Math.abs(step);
    else if (min === max) return [min];
    let result = [];

    if (min < max) {
        for (let i = min; i <= max; i += step) {
            result.push(i);
        }
    } else {
        for (let i = min; i >= max; i += step) {
            result.push(i);
        }
    }

    return result;
}

/**
 * Translates Battleship coordinates to sea index
 * @param {string} coords Letter number coordinate <A-J><1-10>
 * @return {number} Sea index
 */
function toIndex(coords) {
    return FieldLetters.indexOf(coords[0]) * 10 + Number(coords.slice(1)) - 1;
}

/**
 * Transform an index to coordinates
 * @param {number} index Index in the sea (0-99)
 * @return {array} A coordinate in the form [row, column]
 */
function indexToCoords(index) {
    return [Math.floor(index / 10), index % 10];
}

/**
 * @typedef {object} SpaceAround
 * @property {boolean} row Whether there is space around a ship on the row of
 * the ship
 * @property {boolean} col Whether there is space around a ship on the column of
 * the ship
 */

/**
 * Checks whether there is given space around a ship
 * @param {array} sea Sea field
 * @param {number} shipStart Index of the front of the ship
 * @param {number} shipEnd Index of the end of the ship (0-99)
 * @param {number} space Minimum amount of space around the ship required
 * @return {SpaceAround} Information on the space available ardound the ship
 */
function spaceAround(sea, shipStart, shipEnd, space) {
    // [row, col]
    let coordsStart = indexToCoords(shipStart),
        coordsEnd = indexToCoords(shipEnd);

    let row = false,
        col = false;
    let empty = i => (i < 0 ? false : sea[i] == 0);

    // Ship on one row
    if (coordsStart[0] === coordsEnd[0]) {
        // left of the ship
        row =
            (Math.floor((shipStart - space) / 10) === coordsStart[0] &&
                range(shipStart - space, shipStart - 1).every(empty)) ||
            // right of the ship
            (Math.floor((shipEnd + space) / 10) === coordsEnd[0] &&
                range(
                    shipEnd + 1,
                    Math.min(shipEnd + space, coordsEnd[0] * 10 + 9)
                ).every(empty));
    }
    // Ship on one column
    if (coordsStart[1] === coordsEnd[1]) {
        // Above the ship
        col =
            (shipStart - space * 10 > -1 &&
                range(shipStart - space * 10, shipStart - 10, 10).every(
                    empty
                )) ||
            // Beneath the ship
            (shipEnd + space * 10 < 100 &&
                range(shipEnd + 10, shipEnd + space * 10, 10).every(empty));
    }

    return { row, col };
}

/**
 * Lists indizes of ships in sea field
 * @param {string} ship Ship letter
 * @param {array} field Sea field
 * @return {array} List of matching indizes
 */
function findOccurrences(ship, field) {
    let result = [];
    field.forEach((el, i) => (el === ship ? result.push(i) : ""));
    return result;
}

/**
 * Deselects a ship pill
 * @param {element} pill HTML Element of pill to deselect
 */
function deselectPill(pill) {
    currentShip = undefined;
    currentPill = undefined;

    pill.classList.remove("active");
    pill.blur();
}

/**
 * Deletes a ship by removing it from the sea and changing the ui
 * @param {string} ship Ship letter from A-E
 * @param {element} pill HTML Element for pill to select
 */
function deleteShip(ship, pill) {
    let icon = pill.querySelector(".icon");
    icon.parentElement.removeChild(icon);

    currentShip = undefined;
    currentPill = undefined;
    // Field
    fields
        .filter(field => field.dataset.ship === ship)
        .forEach(field => {
            field.removeAttribute("data-ship");
            field.className = "sea__field";
        });

    Sea = Sea.map(field => (field === ship ? 0 : field));
}

/**
 * Selects a ship by setting up select logic and changing ui
 * @param {string} ship Ship letter from A-E
 * @param {element} pill HTML Element for pill to select
 */
function selectShip(ship, pill, deselectCb) {
    currentShip = ship;
    currentPill = pill;

    pill.classList.add("active");
    if (!pill.querySelector(".feather-close")) {
        pill.insertAdjacentHTML("beforeend", close);
    }

    pill.querySelector(".feather-close").addEventListener("click", e => {
        e.stopPropagation();
        deleteShip(ship, pill);
        deselectPill(pill);
        deselectCb(Sea);
    });
}

/**
 * Places a ship on the sea and updates the ui
 * @param {element} field HTML Element for sea field
 * @param {string} ship Ship letter from A-E
 */
function placeShip(field, ship, doneCb) {
    let index = toIndex(field.dataset.field);
    let shipOccurrences = findOccurrences(ship, Sea)
        .concat([index])
        .sort((a, b) => a - b);

    if (Sea[index] !== 0) return false;
    else if (shipOccurrences.length > Ships[ship]) return false;
    else if (!validShipPlacement(ship, shipOccurrences, false)) return false;
    else {
        Sea[index] = ship;
        field.classList.add("ship", `ship-${FieldLetters.indexOf(ship) + 1}`);
        field.dataset.ship = ship;
        if (shipOccurrences.length === Ships[ship]) {
            deselectPill(currentPill);
            // Call doneCallback from @initShippicker if sea is valid
            validGameField(Sea).valid && doneCb(Sea);
        }
    }
}

/**
 * Places or completes a specified ship randomly on the sea
 * @param {array} sea Sea field
 * @param {string} ship Ship letter from A-E
 * @param {array} [occurrences=[]] List of already placed ship-parts
 */
function placeShipRandomly(sea, ship, occurrences = []) {
    let size = Ships[ship];

    // Check whether ship placement can be completed
    if (occurrences.length === size) return;
    else if (
        occurrences.length > 0 &&
        !Object.values(
            spaceAround(
                sea,
                occurrences[0],
                occurrences[occurrences.length - 1],
                size - occurrences.length
            )
        ).some(val => val)
    ) {
        deleteShip(ship, pills.find(pill => pill.dataset.ship === ship));
        occurrences = [];
    }

    // Place ship randomly
    if (occurrences.length === 0) {
        do {
            let point = randomInRange(0, 99);

            if (
                sea[point] == 0 &&
                Object.values(spaceAround(Sea, point, point, size)).some(
                    val => val
                )
            ) {
                occurrences.push(point);
                // Place it
                sea[point] = ship;
                sea[point] = ship;
                fields[point].classList.add(
                    "ship",
                    `ship-${FieldLetters.indexOf(ship) + 1}`
                );
                fields[point].dataset.ship = ship;
            }
        } while (occurrences.length === 0);
    }

    let dir = spaceAround(
        sea,
        occurrences[0],
        occurrences[occurrences.length - 1],
        size - occurrences.length
    );
    dir = Object.keys(dir).filter(key => dir[key]);
    dir = dir[randomInRange(0, dir.length - 1)] === "row" ? 1 : 10;

    do {
        let pos = occurrences[0] - dir;
        let overflowsLeft =
            Math.floor(occurrences[0] / 10) !== Math.floor(pos / 10);

        if (sea[pos] != 0 || pos < 0 || (dir == 1 && overflowsLeft))
            pos = occurrences[occurrences.length - 1] + dir;

        sea[pos] = ship;
        fields[pos].classList.add(
            "ship",
            `ship-${FieldLetters.indexOf(ship) + 1}`
        );
        fields[pos].dataset.ship = ship;

        occurrences[pos < occurrences[0] ? "unshift" : "push"](pos);
    } while (occurrences.length < size);
}

/*====*\
  Main
\*====*/
/**
 * Initializes the shiplist
 * @param {(element|string)} list HTML Element referencing the shiplist
 * @param {function} [deselectCb] Calllback function to be called when user
 * deselects ship, e.g. because field was valid and done btn enabled but
 * then user decides to change ships placement
 */
function initShiplist(list, deselectCb = () => "") {
    if (!(list instanceof Element)) list = document.querySelector(list);

    pills = [...list.querySelectorAll(".pill")];

    pills.forEach(pill =>
        pill.addEventListener("click", () => {
            if (currentShip) {
                currentShip = undefined;
                currentPill.classList.remove("active");
                currentPill = undefined;
            }
            selectShip(pill.dataset.ship, pill, deselectCb);
        })
    );
}

/**
 * Initializes the shippicker interface
 * @param {(element|string)} picker HTML Element referencing the shippicker sea
 * @param {function} [doneCb] callback function called when sea is valid and
 * done btn can be enabled
 */
function initShippicker(picker, doneCb = () => "") {
    if (!(picker instanceof Element)) picker = document.querySelector(picker);

    fields = [...picker.querySelectorAll(".sea__field")];

    fields.forEach(field =>
        field.addEventListener("click", () =>
            currentShip ? placeShip(field, currentShip, doneCb) : false
        )
    );
}

/**
 * Place ships randomly on sea, complete unfinished ships and skip already
 * placed ships
 */
function placeRandomly() {
    if (currentPill) deselectPill(currentPill);

    return Object.keys(Ships).forEach(ship => {
        let pill = pills.find(pill => pill.dataset.ship === ship);

        // Delete
        if (findOccurrences(ship, Sea).length === Ships[ship])
            deleteShip(ship, pill);
        // Place randomly
        placeShipRandomly(Sea, ship, findOccurrences(ship, Sea));
        // Select pill
        pill.click();
        deselectPill(pill);
    });
}

/**
 * Returns sea field or false if it's invalid
 */
function getShipPlacement() {
    return validGameField(Sea).valid && Sea;
}

export { initShippicker, initShiplist, placeRandomly, getShipPlacement };
