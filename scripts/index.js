const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    alt: "Yosemite Valley sky and mountain top",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    alt: "Sky and two mountain tops with Lake Louise running through the bottom",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    alt: "Sunrise over large mountains",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    alt: "Starry sky over gray rocky mountains",
  },

  {
    name: "Vanoise National Park ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    alt: "Mountain background with tall pine trees and river running through them",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    alt: "Tall mountains with a green river and canoes at dock",
  },
];

const profileEditButton = document.querySelector("#profile-edit-button");

const profileEditModal = document.querySelector("#profile-edit-modal");
const editModalWindow = document.querySelector(".js-edit-modal");

const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");

const nameInput = document.querySelector("#modal-name");
const jobInput = document.querySelector("#modal-job");

const profileEditForm = profileEditModal.querySelector("#modal-form");
const addCardFormElement = document.querySelector("#js-add-modal");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item");

const cardList = document.querySelector(".cards__list");

const addModalButton = document.querySelector(".profile__add-button");

const addModalWindow = document.querySelector("#js-add-modal");

const addModalCloseButton = addModalWindow.querySelector(".modal__close");

const editModalCloseButton = editModalWindow.querySelector(".modal__close");

const previewImageModalWindow = document.querySelector("#preview-image-modal");

const previewImageElement = document.querySelector(".modal__preview-image");

const previewModalCloseButton =
  previewImageModalWindow.querySelector(".modal__close");

const previewModalCaption = previewImageModalWindow.querySelector(
  ".modal__preview-caption"
);

const cardTitleInput = addCardFormElement.querySelector(".modal__title");
const cardUrlInput = addCardFormElement.querySelector(".modal__new_location");

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
}

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent.trim();
  jobInput.value = profileDescription.textContent.trim();
  openPopup(profileEditModal);
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profileEditModal);
});

addModalButton.addEventListener("click", () => openPopup(addModalWindow));

addModalCloseButton.addEventListener("click", () => {
  closePopup(addModalWindow);
});

editModalCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});

previewModalCloseButton.addEventListener("click", () => {
  closePopup(previewImageModalWindow);
});

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

function generateCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = (cardElement.querySelector(".card__title").textContent =
    card.name);

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const imageEl = cardElement.querySelector(".card__image");

  imageEl.src = card.link;
  imageEl.alt = card.alt;

  imageEl.addEventListener("click", function () {
    previewImageElement.src = card.link;
    previewImageElement.alt = card.alt;
    previewModalCaption.textContent = card.name;
    openPopup(previewImageModalWindow);
  });

  cardLikeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like-button_active");
  });

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

function renderCard(card, container) {
  container.prepend(card);
  console.log(card);
  console.log(container);
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editModalWindow);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const newCardElement = generateCard({
    name,
    link,
  });
  renderCard(newCardElement, cardList);
  e.target.reset();
  closePopup(addModalWindow);
}

initialCards.forEach(function (card) {
  const newCard = generateCard(card);
  renderCard(newCard, cardList);
});

const likeButtons = document.querySelectorAll(".card__like-button");
likeButtons.forEach((likeButton) => {});
