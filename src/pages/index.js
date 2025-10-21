import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";

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

const cardList = document.querySelector(".cards__list");

const profileEditButton = document.querySelector("#profile-edit-button");

const profileEditModal = document.querySelector("#profile-edit-modal");
const editModalWindow = document.querySelector(".js-edit-modal");

const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");

const nameInput = document.querySelector("#modal-name");
const jobInput = document.querySelector("#modal-job");

const profileEditForm = profileEditModal.querySelector("#modal-form");
const grabModalContainer = document.querySelector("#js-add-modal");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item");

const modals = document.querySelectorAll(".modal");

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

const cardTitleInput = grabModalContainer.querySelector(".modal__title");
const cardUrlInput = grabModalContainer.querySelector(
  ".modal__input--new-location"
);

const newCardPopup = new PopupWithForm(
  "#js-add-modal",
  handleAddCardFormSubmit
);
newCardPopup.open();

newCardPopup.close();

// Section to render all cards
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, "#card-template", (name, link, alt) =>
        imagePopup.open(name, link, alt)
      );
      const cardElement = card.getView();
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

cardSection.renderItems();

// Edit Profile popup

const editProfilePopup = new PopupWithForm({
  popupSelector: ".profile-edit-modal",
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo({
      name: formData.title,
      about: formData.description,
    });

    editProfilePopup.close();
  },
});

editProfilePopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  jobInput.value = currentUserInfo.about;

  editProfilePopup.open();
});

const imagePopup = new PopupWithImage("#preview-image-modal");
imagePopup.setEventListeners();

//------------------- USER INFO -------------------//
const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  aboutSelector: "#profile-description",
});

//------------------- POPUP HELPERS -------------------//
function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKey);
}

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".modal.modal_opened");
    if (openModal) {
      closePopup(openModal);
    }
  }
}

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (event) => {
    if (event.target === modal) {
      closePopup(modal);
    }
  });
});

//------------------- EVENT LISTENERS -------------------//

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  jobInput.value = currentUserInfo.about;

  editProfilePopup.open();
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

function handleImageClick(name, link, alt) {
  previewImageElement.src = link;
  previewImageElement.alt = alt;
  previewModalCaption.textContent = name;
  openPopup(previewImageModalWindow);
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
  const card = new Card(
    { name, link, alt: name },
    "#card-template",
    handleImageClick
  );
  const cardElement = card.getView();
  renderCard(cardElement, cardList);
  e.target.reset();
  const submitButton = e.target.querySelector(".modal__button");
  submitButton.disabled = true;
  submitButton.classList.add("modal__button_disabled");
  closePopup(addModalWindow);
}
grabModalContainer.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  cardList.prepend(cardElement);
});

//------------------- FORM VALIDATION -------------------//

const validationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const profileFormValidator = new FormValidator(
  validationConfig,
  profileEditForm
);

const cardFormValidator = new FormValidator(
  validationConfig,
  grabModalContainer
);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
