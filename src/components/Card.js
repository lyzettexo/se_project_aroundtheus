export class Card {
  constructor(
    { name, link, alt = name, _id, likes = [], owner = {} },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
    currentUserId
  ) {
    this.name = name;
    this.link = link;
    this.alt = alt;
    this._id = _id;
    this._likes = likes;
    this._ownerId = owner._id;
    this._currentUserId = currentUserId;

    this.cardSelector = cardSelector;
    this.handleImageClick = handleImageClick;
    this.handleDeleteClick = handleDeleteClick;
    this.handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this.handleLikeClick();
    });

    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        this.handleDeleteClick();
      });
    }

    this._imageElement.addEventListener("click", () => {
      this.handleImageClick(this.name, this.link);
    });
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._currentUserId);
  }

  setLikes(likes) {
    this._likes = likes;
    this._likeCountElement.textContent = this._likes.length;

    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  _handleDeleteButton() {
    if (this._ownerId !== this._currentUserId) {
      this._deleteButton.remove();
      this._deleteButton = null;
    }
  }

  getView() {
    this._cardElement = document
      .querySelector(this.cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._imageElement = this._cardElement.querySelector(".card__image");
    this._likeCountElement =
      this._cardElement.querySelector(".card__like-count");

    this._cardElement.querySelector(".card__title").textContent = this.name;
    this._imageElement.src = this.link;
    this._imageElement.alt = this.alt;

    this.setLikes(this._likes);
    this._handleDeleteButton();
    this._setEventListeners();

    return this._cardElement;
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
