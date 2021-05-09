//import { Card } from "./Card.js";
//import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./initial-cards.js";
import { hideInputError, toggleButtonState } from "./validate.js";
import { settingsElems } from "./settings.js";

//получаем шаблон с разметкой для одного элемента (карточки) и контейнер для элементов
const cardTemplate = document.querySelector('#element').content.querySelector('.elements__element');
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
const popupPhoto = popupViewPhoto.querySelector('.popup__photo');
const popupPhotoName = popupViewPhoto.querySelector('.popup__photo-name');

//получаем все модальные окна в документе
const popupsArr = Array.from(document.querySelectorAll('.popup'));

//функция создания карточки, возвращает элемент, готовый для встраивания.
//принимает значения: name - название места и link - ссылка на фото
function createCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  
  cardElement.querySelector('.elements__name').textContent = name;
  cardElement.querySelector('.elements__photo').src = link;
  cardElement.querySelector('.elements__photo').alt = name;
  
  const likeButton = cardElement.querySelector('.elements__like-button');
  likeButton.addEventListener('click', handleLikeButtoActive);

  const deleteButton = cardElement.querySelector('.elements__delete-button');
  deleteButton.addEventListener('click', handleCardDelete)

  const cardPhoto = cardElement.querySelector('.elements__photo');
  cardPhoto.addEventListener('click', function() {
    popupPhoto.src = link;
    popupPhoto.alt = name;
    popupPhotoName.textContent = name;
    openPopup(popupViewPhoto);
  });

  return cardElement;
}

//функция открытия popup
function openPopup (popup) {
  popup.classList.add('popup_visible');
  //добавляем в документ слушатель события закрытия модального окна по Esc
  document.addEventListener('keydown', closePopupByEsc);
}

//функция закрытия popup
function closePopup (popup) {
  popup.classList.remove('popup_visible');
  //удаляем из документа слушатель события закрытия модального окна по Esc
  document.removeEventListener('keydown', closePopupByEsc);
}

//функция открытия окна редактирования профиля
function handleEditProfilePopupOpen() {
  openPopup(popupEditProfile);
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  //очищаем сообщения об ошибках
  hideInputError (editForm, inputName, settingsElems.inputErrorClass, settingsElems.errorClass);
  hideInputError (editForm, inputProfession, settingsElems.inputErrorClass, settingsElems.errorClass);
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
  //скрываем сообщения об ошибках перед открытием
  hideInputError (addForm, inputPlace, settingsElems.inputErrorClass, settingsElems.errorClass);
  hideInputError (addForm, inputImgUrl, settingsElems.inputErrorClass, settingsElems.errorClass);
  //выбираем поля формы и кнопку отправки
  const inputListAddForm = Array.from(addForm.querySelectorAll(settingsElems.inputSelector));
  const submitButtonAddForm =  addForm.querySelector(settingsElems.submitButtonSelector);
  //делаем кнопку неактивной для следующего открытия
  toggleButtonState(inputListAddForm, submitButtonAddForm, settingsElems.inactiveButtonClass);
  openPopup(popupAddCard);
}

//функция закрытия окна добавления карточки
function handleAddCardPopupClose() {
  closePopup(popupAddCard);
}

//функция отправки формы добавления карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardElement = createCard(inputPlace.value, inputImgUrl.value);
  addForm.reset();
  cardElements.prepend(cardElement);
  closePopup(popupAddCard);
}

//функция лайка на карточку
function handleLikeButtoActive(evt) {
  evt.target.classList.toggle('elements__like-button_active');
}

//функция удаления карточки
function handleCardDelete(evt) {
  evt.target.closest('.elements__element').remove();
}

//функция закрытия окна просмотра фото
function handleViewPhotoPopupClose() {
  closePopup(popupViewPhoto);
}

//функция закрытия модального окна по нажатию Escape
function closePopupByEsc (evt) {
  if(evt.key === 'Escape') {
    const visiblePopup = document.querySelector('.popup_visible');
    closePopup(visiblePopup);
  }
 }

//функция закрытия модального окна при клике на его overlay
function closePopupByOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

//отображаем карточки из массива
initialCards.forEach(element => {
  const cardElement = createCard(element.name, element.link);
  cardElements.append(cardElement); 
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

