const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

console.log(initialCards);

const profileEditButton = document.querySelector("#profile-edit-button");
//dupes
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

const previewModalCloseButton = document.querySelector("#preview-close-button");

const cardTitleInput = addCardFormElement.querySelector(".modal__title");
const cardUrlInput = addCardFormElement.querySelector(".modal__new_location");

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function toggleModalWindow(modal) {
  modal.classList.add("modal_opened");
}

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent.trim();
  jobInput.value = profileDescription.textContent.trim();
  toggleModalWindow(profileEditModal);
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profileEditModal);
});

addModalButton.addEventListener("click", () =>
  toggleModalWindow(addModalWindow)
);

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

//editModalCloseButton.addEventListener("click", () => toggleModalWindow(editModalWindow));

/*
initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardList.append(cardElement);
});

/*
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image").style.backgroundImage = card.link;
  const cardTitle = cardElement.querySelector(".card__title").textContent = card.name;
  const likeButton = card.cardElement.querySelector(".card__like-button");
  
  
  
  
  
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  return cardElement;
}

*/

function generateCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = (cardElement.querySelector(".card__title").textContent =
    card.name);

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const imageEl = cardElement.querySelector(".card__image");

  imageEl.style.backgroundImage = `url(${card.link})`;

  imageEl.addEventListener("click", function () {
    previewImageElement.src = card.link;
    toggleModalWindow(previewImageModalWindow);
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
  closePopup(addModalWindow);
}

initialCards.forEach(function (card) {
  const newCard = generateCard(card);
  renderCard(newCard, cardList);
});

const likeButtons = document.querySelectorAll(".card__like-button");
likeButtons.forEach((likeButton) => {});
