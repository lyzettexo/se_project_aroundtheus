export class Card {
  constructor(
    { name, link, alt = name, _id, owner = {}, isLiked = false },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
    currentUserId
  ) {
    this._name = name;
    this._link = link;
    this._alt = alt;
    this._id = _id;
    this._isLiked = isLiked;
    this._ownerId = typeof owner === "string" ? owner : owner._id;
    this._currentUserId = currentUserId;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        this._handleDeleteClick();
      });
    }

    this._imageElement.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  isLiked() {
    return this._isLiked;
  }

  setLikes(cardData) {
    this._isLiked = cardData.isLiked ?? this._isLiked;

    this._likeButton.classList.toggle(
      "card__like-button_active",
      this._isLiked
    );
  }

  _handleDeleteButton() {
    if (this._ownerId !== this._currentUserId) {
      this._deleteButton.remove();
      this._deleteButton = null;
    }
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._imageElement = this._cardElement.querySelector(".card__image");

    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._alt;

    this._likeButton.classList.toggle(
      "card__like-button_active",
      this._isLiked
    );

    this._handleDeleteButton();
    this._setEventListeners();

    return this._cardElement;
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
