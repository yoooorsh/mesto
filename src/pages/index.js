import './index.css';
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { initialCards } from "../utils/initial-cards.js";
import { settingsElems } from "../utils/settings.js";
import { 
  cardElementsSelector, 
  profileEditButtonSelector, 
  profileNameSelector,
  profileProfessionSelector,
  inputName,
  inputProfession,
  editForm,
  cardsAddButtonSelector,
  popupAddCardSelector,
  inputPlace,
  inputImgUrl,
  addForm,
  popupEditProfileSelector,
  popupViewPhotoSelector,
 } from "../utils/constants.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";

//создаём объекты валидаторов форм
const validatorEditForm = new FormValidator({...settingsElems, openFormBtnSelector: profileEditButtonSelector}, editForm);
const validatorAddForm = new FormValidator({...settingsElems, openFormBtnSelector: cardsAddButtonSelector}, addForm);
const userInfo = new UserInfo(profileNameSelector, profileProfessionSelector);
const popupWithImage = new PopupWithImage(popupViewPhotoSelector);

const cards = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item.name, item.link);
    cards.addItem(cardElement);
  },
}, cardElementsSelector);

const editProfilePopup = new PopupWithForm(popupEditProfileSelector, (event) => {
  event.preventDefault();
  userInfo.setUserInfo(inputName.value, inputProfession.value);
  editProfilePopup.close();
});

const addCardPopup = new PopupWithForm(popupAddCardSelector, (event) => {
  event.preventDefault();
  const cardElement = createCard(inputPlace.value, inputImgUrl.value);
  cards.addItemToStart(cardElement);
  addCardPopup.close();
});

popupWithImage.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();

//функция открытия окна редактирования профиля
function handleEditProfilePopupOpen() {
  editProfilePopup.open();
  const {name, profession} = userInfo.getUserInfo();
  inputName.value = name;
  inputProfession.value = profession;
}

//функция открытия окна добавления карточки
function handleAddCardPopupOpen() {
  addCardPopup.open();
}

function createCard(name, link) {
  const card = new Card(name, link, '#element', popupWithImage.open);
  const cardElement = card.createCard();

  return cardElement;
}

cards.renderItems();

//кнопка редактирования профиля
const profileEditButton = document.querySelector(profileEditButtonSelector);
profileEditButton.addEventListener('click', handleEditProfilePopupOpen);

//кнопка добавления карточки
const cardsAddButton = document.querySelector(cardsAddButtonSelector);
cardsAddButton.addEventListener('click', handleAddCardPopupOpen);

//запускаем валидацию форм
validatorEditForm.enableValidation();
validatorAddForm.enableValidation();