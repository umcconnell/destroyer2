const wait = (ms) => new Promise((res) => setTimeout(res, ms));
let snackbarCount = 0;

async function showSnackbar(snackbar, text, duration = 2000) {
    if (!(snackbar instanceof Element))
        snackbar = document.querySelector(snackbar);

    let clonedSnackbar = snackbar.cloneNode(true);
    snackbar.insertAdjacentElement("afterend", clonedSnackbar);
    snackbarCount++;

    let content = [...clonedSnackbar.childNodes].find(
        (n) => n.classList && n.classList.contains("snackbar__content")
    );

    content.innerHTML = text;
    clonedSnackbar.style.zIndex = 100 + snackbarCount;
    clonedSnackbar.classList.add("show");

    await wait(duration);
    clonedSnackbar.classList.remove("show");
    await wait(250);
    return (
        clonedSnackbar.parentElement.removeChild(clonedSnackbar) &&
        (content.innerHTML = "")
    );
}

function showOverlay(overlay, text) {
    if (!(overlay instanceof Element))
        overlay = document.querySelector(overlay);

    let content = overlay.querySelector(".overlay__content");

    content.innerHTML = text;
    overlay.classList.add("show");
}

export { showOverlay, showSnackbar };
