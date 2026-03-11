export class Card {
  constructor(
    { name, link, alt = name, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this.name = name;
    this.link = link;
    this.alt = alt;
    this._id = _id;
    this.isLiked = isLiked;
    this.cardSelector = cardSelector;
    this.handleImageClick = handleImageClick;
    this.handleDeleteClick = handleDeleteClick;
    this.handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this.handleLikeClick();
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this.handleDeleteClick();
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this.handleImageClick(this.name, this.link);
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

    this._likeButton = this._cardElement.querySelector(".card__like-button");

    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }

    this._setEventListeners();
    return this._cardElement;
  }

  setLikes(isLiked) {
    this.isLiked = isLiked;

    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
