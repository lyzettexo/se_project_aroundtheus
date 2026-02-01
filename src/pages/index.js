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

// ------------------- DOM ELEMENTS ------------------- //
const profileEditButton = document.querySelector("#profile-edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const nameInput = document.querySelector("#modal-name");
const jobInput = document.querySelector("#modal-job");
const profileEditForm = document.querySelector("#modal-form");
const addCardForm = document.querySelector("#modal-form-place");

// ------------------- VALIDATION CONFIG ------------------- //
const validationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// ------------------- USER INFO ------------------- //
const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  aboutSelector: "#profile-description",
});

// - IMAGE POPUP - //
const imagePopup = new PopupWithImage("#preview-image-modal");
imagePopup.setEventListeners();

// -CARD SECTION - //
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, "#card-template", (name, link) =>
        imagePopup.open(name, link)
      );
      const cardElement = card.getView();
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);
cardSection.renderItems();

// - ADD CARD POPUP - //
const addCardPopup = new PopupWithForm("#js-add-modal", (formData) => {
  const card = new Card(
    { name: formData.title, link: formData.description },
    "#card-template",
    (name, link) => imagePopup.open(name, link)
  );
  const cardElement = card.getView();
  cardSection.addItem(cardElement);
  addCardPopup.close();
});
addCardPopup.setEventListeners();

// - EDIT PROFILE POPUP - //
const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    userInfo.setUserInfo({
      name: formData.title,
      about: formData.description,
    });
    editProfilePopup.close();
  }
);
editProfilePopup.setEventListeners();

// - VALIDATION - //
const profileFormValidator = new FormValidator(
  validationConfig,
  profileEditForm
);
const cardFormValidator = new FormValidator(validationConfig, addCardForm);
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

// - EVENT LISTENERS - //
profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  jobInput.value = currentUserInfo.about;
  profileFormValidator.resetValidation();
  editProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  cardFormValidator.resetValidation();
  addCardPopup.open();
});
