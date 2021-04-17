//Настройки элементов
const settingsElems = {
  formSelector: '.popup__container',
  fieldsetSelector: '.popup__fieldset',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup_save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_show'
}

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
const popupArr = Array.from(document.querySelectorAll('.popup'));

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
}

//функция закрытия popup
function closePopup (popup) {
  popup.classList.remove('popup_visible');
}

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
  openPopup(popupAddCard);
}

//функция закрытия окна добавления карточки
function handleAddCardPopupClose() {
  closePopup(popupAddCard);
}

//функция отправки формы добавления карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  cardElement = createCard(inputPlace.value, inputImgUrl.value);
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
function keyEscPopupCloseHandler (evt) {
  if(evt.key === 'Escape') {
    const visiblePopup = document.querySelector('.popup_visible');
    if (visiblePopup) {
      closePopup(visiblePopup);
    }
  }
 };

//функция закрытия модального окна при клике на его overlay
function OvrlClickPopupCloseHandler(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};

//отображаем карточки из массива
initialCards.forEach(element => {
  cardElement = createCard(element.name, element.link);
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

//обработка события нажатия на Esc для закрытия модального окна
document.addEventListener('keydown', keyEscPopupCloseHandler);

//обработка события нажатия на overlay для всех модальных окон в документе, закрывает модальное окно
popupArr.forEach(popup => {
  popup.addEventListener('click', OvrlClickPopupCloseHandler);
 });
