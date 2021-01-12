const fieldLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

function initSea(sea) {
    if (!(sea instanceof Element)) sea = document.querySelector(sea);

    let fields = [...sea.querySelectorAll(".sea__field")];
    let labels = [...sea.querySelectorAll(".sea__label")].reduce(
        // Split labels into [[numbers], [letters]]
        (acc, curr) => {
            curr.innerText &&
                acc[fieldLetters.includes(curr.innerText) ? 1 : 0].push(curr);
            return acc;
        },
        [[], []]
    );

    console.log(labels);

    fields.forEach((field) => {
        field.addEventListener("mouseenter", () => {
            let coords = field.dataset.field;
            labels[0][Number(coords.slice(1)) - 1].classList.add("active");
            labels[1][fieldLetters.indexOf(coords[0])].classList.add("active");
        });

        field.addEventListener("mouseleave", () =>
            labels.forEach((group) =>
                group.forEach((label) => label.classList.remove("active"))
            )
        );
    });
}

export { initSea };
