function accessibilizeModal(Modal) {
    Modal.modal.setAttribute("role", "dialog");
    Modal.modal.setAttribute("tabindex", "-1");
}

function accessibilizeCloseBtn(closeBtn) {
    closeBtn.setAttribute("aria-label", "Close Dialog");
}

function addBackdrop(modal) {
    let backdrop = document.createElement("div");
    backdrop.className = "modal__backdrop";
    modal.insertAdjacentElement("beforeend", backdrop);
    return backdrop;
}

function bindEvents(Modal) {
    let focusElements = focusableElements(Modal.modal);

    Modal.firstFocusElement = focusElements[0] || Modal.modal;
    Modal.lastFocusElement =
        focusElements[focusElements.length - 1] || Modal.modal;

    Modal.modal.addEventListener(
        "click",
        ({ target }) => target === Modal.backdrop && Modal.close()
    );

    Modal.closeBtn.forEach(btn =>
        btn.addEventListener("click", () => Modal.close())
    );

    Modal.modal.addEventListener("keydown", e => {
        if (Modal.state !== "open") return;
        else if (e.key === "Escape") {
            Modal.close();
        } else if (e.key === "Tab") {
            if (
                e.shiftKey &&
                (e.target === Modal.firstFocusElement ||
                    e.target === Modal.modal)
            ) {
                Modal.lastFocusElement.focus();
                e.preventDefault();
            } else if (
                !e.shiftKey &&
                (e.target === Modal.lastFocusElement ||
                    e.target === Modal.modal)
            ) {
                Modal.firstFocusElement.focus();
                e.preventDefault();
            }
        }
    });
}

function focusableElements(modal) {
    // see: https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element
    return [
        ...modal.querySelectorAll(
            'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
    ];
}

export default class Modal {
    constructor(modal) {
        if (!(modal instanceof Element)) modal = document.querySelector(modal);

        this.modal = modal;
        this.backdrop =
            modal.querySelector(".modal__backdrop, .modal__background") ||
            addBackdrop(modal);
        this.content = modal.querySelector(".modal__content");
        this.closeBtn = [...modal.querySelectorAll(".modal__close")];

        this.state = "closed";
        this.events = {};

        bindEvents(this);
        accessibilizeModal(this);
        this.closeBtn.forEach(accessibilizeCloseBtn);
    }

    open() {
        if (this.state === "open") return;

        this.modal.classList.add("open");
        this.modal.classList.remove("closed");
        this.state = "open";
        document.body.classList.add("modal-open");

        // Emit event
        this.events["open"] && this.events["open"].forEach(cb => cb(this));
        // Save currently focused element for focus-restore
        this.lastFocusedElement = document.activeElement;
        this.modal.focus();
    }

    close() {
        if (this.state === "closed") return;

        this.modal.classList.add("closed");
        this.modal.classList.remove("open");
        this.state = "closed";

        document.body.classList.remove("modal-open");

        // Emit event
        this.events["close"] && this.events["close"].forEach(cb => cb(this));
        // Restore focus
        this.lastFocusedElement && this.lastFocusedElement.focus();
    }

    toggle() {
        if (this.state === "closed") return this.open();
        return this.close();
    }

    on(evt, cb) {
        this.events[evt]
            ? this.events[evt].push(cb)
            : (this.events[evt] = [cb]);
    }

    removeEvent(evt, func) {
        let evtList = this.events[evt];
        evtList && (evtList = evtList.filter(cb => cb !== func));
    }
}
