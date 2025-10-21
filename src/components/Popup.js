export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(".modal");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (event) => {
      if (
        event.target === this._popup ||
        event.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
  }
}
