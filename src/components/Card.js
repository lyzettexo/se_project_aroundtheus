export class Card {
  constructor({ name, link, alt }, cardSelector, handleImageClick) {
    this.name = name;
    this.link = link;
    this.alt = alt;
    this.cardSelector = cardSelector;
    this.handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", (evt) => {
        evt.target.classList.toggle("card__like-button_active");
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._cardElement.remove();
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this.handleImageClick(this.name, this.link, this.alt);
      });
  }

  getView() {
    this._cardElement = document
      .querySelector(this.cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardElement.querySelector(".card__title").textContent = this.name;
    const image = this._cardElement.querySelector(".card__image");
    image.src = this.link;
    image.alt = this.alt;

    this._setEventListeners();
    return this._cardElement;
  }
}
