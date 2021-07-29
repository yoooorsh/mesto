import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { initialCards } from "../utils/initial-cards.js";
import { settingsElems } from "../utils/settings.js";
import { openPopup, closePopup } from "../utils/popup-helpers.js"
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
  popupsArr,
  popupEditProfileSelector
 } from "../utils/constants.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";

//создаём объекты валидаторов форм
const validatorEditForm = new FormValidator({...settingsElems, openFormBtnSelector: profileEditButtonSelector}, editForm);
const validatorAddForm = new FormValidator({...settingsElems, openFormBtnSelector: cardsAddButtonSelector}, addForm);
const userInfo = new UserInfo(profileNameSelector, profileProfessionSelector);

const cards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link, '#element');
    const cardElement = card.createCard();
    cards.addItem(cardElement);
  },
}, cardElementsSelector);

const editProfilePopup = new PopupWithForm(popupEditProfileSelector, (event) => {
  event.preventDefault();
  userInfo.setUserInfo(inputName.value, inputProfession.value)
});

const addCardPopup = new PopupWithForm(popupAddCardSelector, (event) => {
  event.preventDefault();
  const card = new Card(inputPlace.value, inputImgUrl.value, '#element');
  const cardElement = card.createCard();
  cards.addItemToStart(cardElement);
});

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

//функция закрытия модального окна при клике на его overlay
function closePopupByOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

cards.renderItems();

//кнопка редактирования профиля
const profileEditButton = document.querySelector(profileEditButtonSelector);
profileEditButton.addEventListener('click', handleEditProfilePopupOpen);

//кнопка добавления карточки
const cardsAddButton = document.querySelector(cardsAddButtonSelector);
cardsAddButton.addEventListener('click', handleAddCardPopupOpen);

//обработка события нажатия на overlay для всех модальных окон в документе, закрывает модальное окно
popupsArr.forEach(popup => {
  popup.addEventListener('click', closePopupByOverlay);
});

//запускаем валидацию форм
validatorEditForm.enableValidation();
validatorAddForm.enableValidation();