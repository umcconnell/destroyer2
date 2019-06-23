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
 * Translates Battleship coordinates to sea index
 * @param {string} coords Letter number coordinate <A-J><1-10>
 */
function toIndex(coords) {
    return FieldLetters.indexOf(coords[0]) * 10 + Number(coords.slice(1)) - 1;
}

/**
 * Lists indizes of ships in sea field
 * @param {string} ship ship letter
 * @param {array} field sea field
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
 * Returns sea field or false if it's invalid
 */
function getShipPlacement() {
    return validGameField(Sea).valid && Sea;
}

export { initShippicker, initShiplist, getShipPlacement, placeRandomly };
