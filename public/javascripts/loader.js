// min and max are inclusive
const randomRange = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

function initShipsLoader(radar) {
    if (!(radar instanceof Element)) radar = document.querySelector(radar);
    if (radar.className.indexOf("ships") < 0)
        throw new TypeError(
            "el must be an element or selector referencing an element with class 'ships'"
        );

    let radius =
            Number(
                getComputedStyle(radar)
                    .getPropertyValue("--loader-size")
                    // remove units
                    .replace(/\D/g, "")
            ) / 2,
        ships = [...radar.querySelectorAll(".loader__ship")];

    ships.forEach((ship) => {
        // Center of circle/radar is at (0,0)
        // Formula used: x^2 + y^2 = radius^2

        // x-coordinate of random position with 16px padding off
        // the edge
        let x = randomRange(-radius + 16, radius - 16);
        // Calculate range for y coordinate with 16px padding off
        // the edge
        let yrange = Math.sqrt(radius ** 2 - x ** 2) - 16;
        // y-coordinate inside the circle
        let y = randomRange(-yrange, yrange);

        // Place ship relative to top left corner
        ship.style.left = `${radius + x}px`;
        ship.style.top = `${radius + y}px`;
    });
}

function initAllShipsLoaders() {
    let radars = [...document.querySelectorAll(".loader.ships")];

    radars.forEach(initShipsLoader);
}

export { initShipsLoader, initAllShipsLoaders };
