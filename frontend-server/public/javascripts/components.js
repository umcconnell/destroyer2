import { alertCircle, checkCircle, infoCircle, trash } from "./icons.js";

const icons = {
    error: alertCircle,
    success: checkCircle,
    info: infoCircle
};

const fieldLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

function htmlEscape(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/>/g, "&gt;")
        .replace(/</g, "&lt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
        .replace(/`/g, "&#96;");
}

function html(templateObject, ...substs) {
    const raw = templateObject.raw;

    let result = "";

    substs.forEach((subst, i) => {
        let lit = raw[i];

        if (Array.isArray(subst)) {
            subst = subst.join("");
        }

        if (lit.endsWith("!")) {
            subst = htmlEscape(subst);
            lit = lit.slice(0, -1);
        }
        result += lit;
        result += subst;
    });
    result += raw[raw.length - 1]; // (A)

    return result;
}

const loader = ({ ships = false, id = false, classes = false }) =>
    html`
        <div
            class="loader ${ships ? "ships" : ""} ${classes ? classes : ""}"
            ${id ? `id="${id}"` : ""}
        >
            ${ships
                ? new Array(ships)
                      .fill()
                      .map(_ => `<span class="loader__ship"></span>`)
                : ""}
        </div>
    `;

const snackbar = ({ type, icon = type, id = type, classes = false }) =>
    html`
        <div
            class="snackbar snackbar--${type} ${classes ? classes : ""}"
            ${id ? `id="${id}"` : ""}
        >
            <span class="snackbar__icon">
                ${icon ? (icon.startsWith("<") ? icon : icons[icon]) : ""}
            </span>
            <div class="snackbar__content"></div>
        </div>
    `;

const roomCardDelete = ({ id = false, classes = false, room }) =>
    html`
        <button
            ${id ? `id="${id}"` : ""}
            class="btn--none btn--icon top right ${classes ? classes : ""}"
            data-room-id="${room.id}"
        >
            <span class="visually-hidden">
                Delete my room
            </span>
            ${trash}
        </button>
    `;

const roomCard = ({ id = false, classes = false, myRoom, room }) =>
    html`
        <a
            href="/game.html?r=${room.id}"
            class="room-card ${classes ? classes : ""}"
            ${id ? `id="${id}"` : ""}
        >
            ${myRoom ? roomCardDelete({ room }) : ""}
            <h1 class="room-card__title">${room.name}</h1>
            <h3 class="room-card__subtitle">by ${room.owner}</h3>
        </a>
    `;

const noRooms = () =>
    html`
    <p style="color: gray">
        No open rooms :(<br><br>
        Create your own to get started!</span>
    </p>
    `;

const sea = ({ id = false, classes = false }) =>
    html`
        <div class="sea ${classes ? classes : ""}" ${id ? `id="${id}"` : ""}>
            ${// Top row number labels + empty label in top left
            new Array(11)
                .fill()
                .map(
                    (_, colInd) =>
                        `<span class="sea__label">${
                            colInd === 0 ? "" : colInd
                        }</span>`
                )
                .join("") +
                // Sea + left letter labels
                new Array(10)
                    .fill()
                    .map(
                        (row, rowInd) =>
                            `<span class="sea__label">${
                                fieldLetters[rowInd]
                            }</span>` +
                            new Array(10)
                                .fill()
                                .map(
                                    (col, colInd) =>
                                        `<span
                                                class="sea__field"
                                                data-field="${
                                                    fieldLetters[rowInd]
                                                }${colInd + 1}"></span>`
                                )
                                .join("")
                    )
                    .join("")}
        </div>
    `;

const dialog = ({ id = false, classes = false, content }) =>
    html`
        <dialog
            ${id ? `id="${id}"` : ""}
            class="dialog ${classes ? classes : ""}"
        >
            <button class="dialog__close btn--none">&times</button>
            <p class="dialog__content">
                ${content}
            </p>
        </dialog>
    `;

const gameOverlay = ({ id = false, classes = false, content = "" }) =>
    html`
        <div
            ${id ? `id="${id}"` : ""}
            class="overlay ${classes ? classes : ""}"
        >
            <p class="overlay__content">
                ${content}
            </p>
            <button class="btn" onclick="document.location.reload()">
                Restart
            </button>
            <p>or <a href="./rooms.html">Return Home</a></p>
        </div>
    `;

export {
    loader,
    snackbar,
    roomCard,
    roomCardDelete,
    noRooms,
    sea,
    dialog,
    gameOverlay
};
