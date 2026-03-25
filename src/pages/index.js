import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
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
    authorization: "b1a45cb5-ae91-4e03-a155-fe5192708e0e",
    "Content-Type": "application/json",
  },
});

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
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
});

let currentUserId;

// ------------------- IMAGE POPUP ------------------- //
const imagePopup = new PopupWithImage("#preview-image-modal");
imagePopup.setEventListeners();

// ------------------- DELETE CONFIRMATION POPUP ------------------- //
const deleteConfirmationPopup = new PopupConfirmation("#delete-card-modal");
deleteConfirmationPopup.setEventListeners();

// ------------------- CARD CREATION ------------------- //
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    (name, link) => imagePopup.open({ name, link }),
    () => {
      deleteConfirmationPopup.setSubmitAction(() => {
        api
          .deleteCard(card._id)
          .then(() => {
            card.removeCard();
            deleteConfirmationPopup.close();
          })
          .catch(console.log);
      });
      deleteConfirmationPopup.open();
    },
    () => {
      if (card.isLiked()) {
        api
          .unlikeCard(card._id)
          .then((updatedCard) => {
            card.setLikes(updatedCard);
          })
          .catch(console.log);
      } else {
        api
          .likeCard(card._id)
          .then((updatedCard) => {
            card.setLikes(updatedCard);
          })
          .catch(console.log);
      }
    },
    currentUserId
  );

  return card.getView();
}

// ------------------- CARD SECTION ------------------- //
const cardSection = new Section(
  {
    items: [],
    renderer: (cardData) => {
      cardSection.addItem(createCard(cardData));
    },
  },
  ".cards__list"
);

// ------------------- AVATAR EDIT POPUP ------------------- //
const avatarPopup = new PopupWithForm("#avatar-edit-modal", (formData) => {
  avatarPopup.renderLoading(true);

  api
    .updateAvatar(formData.avatar)
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        about: userData.about,
        avatar: userData.avatar,
      });
      avatarPopup.close();
    })
    .catch(console.log)
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
});

avatarPopup.setEventListeners();

const avatarFormValidator = new FormValidator(validationConfig, avatarForm);
avatarFormValidator.enableValidation();

avatarEditButton.addEventListener("click", () => {
  avatarInput.value = "";
  avatarFormValidator.resetValidation();
  avatarPopup.open();
});

// ------------------- ADD CARD POPUP ------------------- //
const addCardPopup = new PopupWithForm("#js-add-modal", (formData) => {
  addCardPopup.renderLoading(true);

  api
    .addCard({ name: formData.title, link: formData.description })
    .then((cardData) => {
      cardSection.addItem(createCard(cardData));
      addCardPopup.close();
    })
    .catch(console.log)
    .finally(() => {
      addCardPopup.renderLoading(false);
    });
});

addCardPopup.setEventListeners();

// ------------------- EDIT PROFILE POPUP ------------------- //
const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    editProfilePopup.renderLoading(true);

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
      .catch(console.log)
      .finally(() => {
        editProfilePopup.renderLoading(false);
      });
  }
);

editProfilePopup.setEventListeners();

// ------------------- VALIDATION ------------------- //
const profileFormValidator = new FormValidator(
  validationConfig,
  profileEditForm
);
const cardFormValidator = new FormValidator(validationConfig, addCardForm);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

// ------------------- EVENT LISTENERS ------------------- //
profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  jobInput.value = currentUserInfo.about;
  profileFormValidator.resetValidation();
  editProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  addCardForm.reset();
  cardFormValidator.resetValidation();
  addCardPopup.open();
});

// ------------------- DATA FETCHING ------------------- //
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    currentUserId = userData._id;

    console.log("USER DATA:", userData);
    console.log("CARDS DATA:", cardsData);
    console.log("CARDS LENGTH:", cardsData.length);

    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
    });

    cardSection.setItems(cardsData);
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error("INITIAL DATA FAILED:", err);
  });
