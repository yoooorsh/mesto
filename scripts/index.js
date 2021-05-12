import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { initialCards } from "./initial-cards.js";
import { settingsElems } from "./settings.js";
import { openPopup, closePopup } from "./popup-helpers.js"
import { 
  cardElements, 
  profileEditButton, 
  popupEditProfile, 
  popupEditProfileCloseButton,
  profileName,
  profileProfession,
  inputName,
  inputProfession,
  editForm,
  cardsAddButton,
  popupAddCard,
  popupAddCardCloseButton,
  inputPlace,
  inputImgUrl,
  addForm,
  popupViewPhoto,
  popupViewPhotoCloseButton,
  popupsArr
 } from "./constants.js";

//создаём объекты валидаторов форм
const validatorEditForm = new FormValidator({...settingsElems, openFormBtnSelector: '.profile__edit-button'}, editForm);
const validatorAddForm = new FormValidator({...settingsElems, openFormBtnSelector: '.profile__add-button'}, addForm);

//функция открытия окна редактирования профиля
function handleEditProfilePopupOpen() {
  openPopup(popupEditProfile);
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
}

//функция закрытия окна редактирования профиля
function handleEditProfilePopupClose() {
  closePopup(popupEditProfile);
}

//функция отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup(popupEditProfile);
}

//функция открытия окна добавления карточки
function handleAddCardPopupOpen() {
  //очищаем форму перед открытием
  addForm.reset();
  openPopup(popupAddCard);
}

//функция закрытия окна добавления карточки
function handleAddCardPopupClose() {
  closePopup(popupAddCard);
}

//функция отправки формы добавления карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const card = new Card(inputPlace.value, inputImgUrl.value, '#element');
  addForm.reset();
  cardElements.prepend(card.createCard());
  closePopup(popupAddCard);
}

//функция закрытия окна просмотра фото
function handleViewPhotoPopupClose() {
  closePopup(popupViewPhoto);
}

//функция закрытия модального окна при клике на его overlay
function closePopupByOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

//отображаем карточки из массива
initialCards.forEach(element => {
  const card = new Card(element.name, element.link, '#element');
  cardElements.append(card.createCard()); 
});

//кнопка редактирования профиля
profileEditButton.addEventListener('click', handleEditProfilePopupOpen);

//кнопка закрытия модального окна редактирвоания профиля
popupEditProfileCloseButton.addEventListener('click', handleEditProfilePopupClose);

//кнопка отправки формы редактирования профиля
editForm.addEventListener('submit', handleProfileFormSubmit);

//кнопка добавления карточки
cardsAddButton.addEventListener('click', handleAddCardPopupOpen);

//кнопка закрытия модального окна добавления карточки
popupAddCardCloseButton.addEventListener('click', handleAddCardPopupClose);

//кнопка отправки формы модального окна добавления карточки
addForm.addEventListener('submit', handleAddCardFormSubmit);

//кнопка закрытия модального окна просмотра фото
popupViewPhotoCloseButton.addEventListener('click', handleViewPhotoPopupClose);

//обработка события нажатия на overlay для всех модальных окон в документе, закрывает модальное окно
popupsArr.forEach(popup => {
  popup.addEventListener('click', closePopupByOverlay);
});

//запускаем валидацию форм
validatorEditForm.enableValidation();
validatorAddForm.enableValidation();