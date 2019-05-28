// TODO: cleanUp

const ships = ["A", "B", "C", "D", "E"];
const FieldLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

let myFields,
    enemyFields,
    myTurn = true,
    myShipsLeft = 5,
    enemyShipsLeft = 5;
/**
 * Translates Battleship coordinates to sea index
 * @param {string} coords Letter number coordinate <A-J><1-10>
 */
function toIndex(coords) {
    return FieldLetters.indexOf(coords[0]) * 10 + Number(coords.slice(1)) - 1;
}

function handleMessage(msg, events) {
    try {
        msg = JSON.parse(msg.data);
    } catch (err) {
        msg = {
            type: "message",
            msg: msg.data
        };
    }

    if (msg.type in events) return events[msg.type](msg.msg, msg.type);
    return false;
}

function fillField(field, placements, fillHit = true) {
    return placements
        .reduce(
            (acc, curr, i) => (curr != 0 ? acc.concat({ i, ship: curr }) : acc),
            []
        )
        .forEach(ship => {
            let classes = [];

            switch (ship.ship) {
                case 1:
                case "1":
                    classes.push("hit");
                    fillHit && classes.push("ship");
                    break;

                case 2:
                case "2":
                    classes.push("miss");
                    break;

                default:
                    classes.push(
                        "ship",
                        `ship-${ships.indexOf(ship.ship) + 1}`
                    );
                    break;
            }

            field[ship.i].classList.add(...classes);
        });
}

function initMinimalNotifications(ws, interactors) {
    const events = {
        join: interactors["showSnackbar"],
        leave: interactors["showSnackbar"],
        kick: msg =>
            interactors["showSnackbar"](msg).then(
                () => (document.location.href = "/rooms.html")
            ),
        alreadyPlaced: interactors["showGameField"],
        turn: msg => (myTurn = msg),
        reset: interactors["reload"],
        error: interactors["showError"]
    };

    return ws.addEventListener("message", msg => {
        console.log(msg);
        return handleMessage(msg, events);
    });
}

function initGameFields(
    myField,
    enemyField,
    myPlacements,
    enemyPlacements = false
) {
    if (!(myField instanceof Element))
        myField = document.querySelector(myField);
    if (!(enemyField instanceof Element))
        enemyField = document.querySelector(enemyField);

    myFields = [...myField.querySelectorAll(".sea__field")];
    enemyFields = [...enemyField.querySelectorAll(".sea__field")];

    fillField(myFields, myPlacements);
    if (enemyPlacements) fillField(enemyFields, enemyPlacements, false);
}

function initGame(ws, sea, interactors) {
    let setField = (field, i, val, type) =>
        (sea[i] =
            val &&
            (field === "my" ? myFields : enemyFields)[i].classList.add(type));

    enemyFields.forEach(enemyField =>
        enemyField.addEventListener(
            "click",
            () =>
                myTurn &&
                ws.send(
                    JSON.stringify({
                        type: "fire",
                        msg: enemyField.dataset.field
                    })
                )
        )
    );

    let handleFire = (msg, type) => {
        setField(
            msg.you ? "my" : "enemy",
            toIndex(msg.coords),
            type === "miss" ? "2" : "1",
            type === "miss" ? "miss" : "hit"
        );
        if (type === "sunk") msg.you ? myShipsLeft-- : enemyShipsLeft--;

        // msg.you === were your ships hit/sunk/missed
        myTurn = type === "miss" ? msg.you : !msg.you;
        return interactors["switchPlayer"](myTurn);
    };

    const events = {
        leave: interactors["showLoader"],
        ready: msg => {
            msg = JSON.parse(msg);

            interactors["count"](true, myShipsLeft);
            interactors["count"](false, enemyShipsLeft);

            interactors["showMsg"](msg.msg);
            return interactors["showField"](myTurn, msg.enemy);
        },
        count: msg => {
            msg = JSON.parse(msg);

            [myShipsLeft, enemyShipsLeft] = [msg.me, msg.enemy];
            interactors["count"](true, myShipsLeft);
            return interactors["count"](false, enemyShipsLeft);
        },
        hit: msg => {
            msg = JSON.parse(msg);
            handleFire(msg, "hit");
            return interactors["showMsg"](
                msg.you
                    ? `You were hit on ${msg.coords}`
                    : `You hit the enemy on ${msg.coords}`
            );
        },
        sunk: msg => {
            msg = JSON.parse(msg);
            handleFire(msg, "sunk");

            interactors["count"](
                msg.you,
                msg.you ? myShipsLeft : enemyShipsLeft
            );
            return interactors["showMsg"](
                msg.you
                    ? `One of your ships was sunk on ${msg.coords}`
                    : `You sunk a ship on ${msg.coords}`
            );
        },
        miss: msg => {
            msg = JSON.parse(msg);
            handleFire(msg, "miss");
            return interactors["showMsg"](
                msg.you
                    ? `The enemy missed on ${msg.coords}`
                    : `You missed on ${msg.coords}`
            );
        },
        gameOver: interactors["showOverlay"]
    };

    return ws.addEventListener("message", msg => handleMessage(msg, events));
}

export { initMinimalNotifications, initGameFields, initGame };
