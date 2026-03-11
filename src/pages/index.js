import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupConfirmation } from "../components/PopupConfirmation.js";
import { Api } from "../components/Api.js";

// ------------------- DOM ELEMENTS ------------------- //
const profileEditButton = document.querySelector("#profile-edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const nameInput = document.querySelector("#modal-name");
const jobInput = document.querySelector("#modal-job");
const profileEditForm = document.querySelector("#modal-form");
const addCardForm = document.querySelector("#modal-form-place");
const avatarEditButton = document.querySelector("#profile-avatar-edit-button");
const avatarForm = document.querySelector("#avatar-form");
const avatarInput = document.querySelector("#avatar-link-input");

// ------------------- API ------------------- //

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "3030f0b6-b98c-455f-ad5d-d426cf9e8888",
    "Content-Type": "application/json",
  },
});

//"be7726f9-a1d3-44a3-b187-e630675bb727"
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
  avatarSelector: ".profile__avatar",
});

// - IMAGE POPUP - //
const imagePopup = new PopupWithImage("#preview-image-modal");
imagePopup.setEventListeners();

//---------------------------AVATAR------------------------//

const editAvatarPopup = new PopupWithForm("#avatar-edit-modal", (formData) => {
  api
    .updateAvatar(formData.avatar)
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        about: userData.about,
        avatar: userData.avatar,
      });
      editAvatarPopup.close();
    })
    .catch(console.log);
});

editAvatarPopup.setEventListeners();

const avatarFormValidator = new FormValidator(validationConfig, avatarForm);
avatarFormValidator.enableValidation();

avatarEditButton.addEventListener("click", () => {
  avatarInput.value = "";
  avatarFormValidator.resetValidation();
  editAvatarPopup.open();
});

//------- Delete Confirmation Popup -------//

const deleteConfirmationPopup = new PopupConfirmation("#delete-card-modal");
deleteConfirmationPopup.setEventListeners();

// -CARD SECTION - //
const cardSection = new Section(
  {
    items: [],
    renderer: (cardData) => {
      const card = new Card(
        cardData,
        "#card-template",
        (name, link) => imagePopup.open(name, link),
        () => {
          deleteConfirmationPopup.setSubmitAction(() => {
            api
              .deleteCard(cardData._id)
              .then(() => {
                card.removeCard();
                deleteConfirmationPopup.close();
              })
              .catch(console.log);
          });
          deleteConfirmationPopup.open();
        },
        () => {
          if (card.isLiked) {
            api
              .unlikeCard(card._id)
              .then((updatedCard) => {
                card.setLikes(updatedCard.isLiked);
              })
              .catch(console.log);
          } else {
            api
              .likeCard(card._id)
              .then((updatedCard) => {
                card.setLikes(updatedCard.isLiked);
              })
              .catch(console.log);
          }
        }
      );

      const cardElement = card.getView();
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

// - ADD CARD POPUP - //
const addCardPopup = new PopupWithForm("#js-add-modal", (formData) => {
  api
    .addCard({ name: formData.title, link: formData.description })
    .then((cardData) => {
      const card = new Card(
        cardData,
        "#card-template",
        (name, link) => imagePopup.open(name, link),
        () => {
          deleteConfirmationPopup.setSubmitAction(() => {
            api
              .deleteCard(cardData._id)
              .then(() => {
                card.removeCard();
                deleteConfirmationPopup.close();
              })
              .catch(console.log);
          });
          deleteConfirmationPopup.open();
        },
        () => {
          if (card.isLiked) {
            api
              .unlikeCard(card._id)
              .then((updatedCard) => {
                card.setLikes(updatedCard.isLiked);
              })
              .catch(console.log);
          } else {
            api
              .likeCard(card._id)
              .then((updatedCard) => {
                card.setLikes(updatedCard.isLiked);
              })
              .catch(console.log);
          }
        }
      );

      cardSection.addItem(card.getView());
      addCardPopup.close();
    })
    .catch(console.log);
});

addCardPopup.setEventListeners();

// - EDIT PROFILE POPUP - //
const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    api
      .updateUserInfo({
        name: formData.title,
        about: formData.description,
      })
      .then((userData) => {
        userInfo.setUserInfo({
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar,
        });
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
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
// - DATA FETCHING - //

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
    });
  })
  .catch(console.log);

api
  .getInitialCards()
  .then((cardsData) => {
    cardSection.setItems(cardsData);
    cardSection.renderItems();
  })
  .catch(console.log);
