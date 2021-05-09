import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { initialCards } from "./initial-cards.js";
import { settingsElems } from "./settings.js";
import { openPopup, closePopup } from "./popup-helpers.js"

//получаем контейнер для элементов
const cardElements = document.querySelector('.elements');

//получаем элементы для модального окна редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_content_edit-profile');
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const inputName = popupEditProfile.querySelector('.popup__input_content_name');
const inputProfession = popupEditProfile.querySelector('.popup__input_content_profession');
const editForm = popupEditProfile.querySelector('.popup__container');

//получаем элементы для модального окна добавления карточки
const cardsAddButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_content_add-element');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close-button');
const inputPlace = popupAddCard.querySelector('.popup__input_content_place');
const inputImgUrl = popupAddCard.querySelector('.popup__input_content_img-url');
const addForm = popupAddCard.querySelector('.popup__container');

//получаем элементы для модального окна просмотра фотографии
const popupViewPhoto = document.querySelector('.popup_content_view-photo');
const popupViewPhotoCloseButton = popupViewPhoto.querySelector('.popup__close-button');

//получаем все модальные окна в документе
const popupsArr = Array.from(document.querySelectorAll('.popup'));

//функция открытия окна редактирования профиля
function handleEditProfilePopupOpen() {
  const validatorEditForm = new FormValidator(settingsElems, editForm);
  validatorEditForm.enableValidation();
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
  const validatorAddForm = new FormValidator(settingsElems, addForm);
  validatorAddForm.enableValidation();
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
  // const cardElement = createCard(element.name, element.link);
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