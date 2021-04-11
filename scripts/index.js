//изначальный массив мест
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//получаем шаблон с разметкой для одного элемента (карточки) и контейнер для элементов
const cardTemplate = document.querySelector('#element').content;
const cardElements = document.querySelector('.elements');

//получаем элементы для модального окна редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_content_edit-profile');
const popupCloseButton = popupEditProfile.querySelector('.popup__close-button');
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

//функция создания карточки, возвращает элемент, готовый для встраивания.
//принимает значения: name - название места и link - ссылка на фото
function createCard(name, link) {
  let cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  
  cardElement.querySelector('.elements__name').textContent = name;
  cardElement.querySelector('.elements__photo').src = link;
  
  const likeButton = cardElement.querySelector('.elements__like-button');
  likeButton.addEventListener('click', function (evt) {
      evt.target.classList.toggle('elements__like-button_active');
  });

  const deleteButton = cardElement.querySelector('.elements__delete-button');
  deleteButton.addEventListener('click', function() {
    const cardElementToDelete = deleteButton.closest('.elements__element');
    cardElementToDelete.remove();
  })

  const cardPhoto = cardElement.querySelector('.elements__photo');
  cardPhoto.addEventListener('click', function() {
    popupPhoto.src = link;
    popupPhotoName.textContent = name;
    popupViewPhoto.classList.add('popup_visible');
  });

  return cardElement;
}

//функция открытия окна редактирования профиля
function openPopupHandler() {
  popupEditProfile.classList.add('popup_visible');
  inputName.setAttribute('value', profileName.textContent);
  inputProfession.setAttribute('value', profileProfession.textContent);
}

//функция закрытия окна редактирования профиля
function closePopupHandler() {
  popupEditProfile.classList.remove('popup_visible');
}

//функция отправки формы редактирования профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopupHandler();
}

//функция открытия окна добавления карточки
function openAddCardPopupHandler() {
  popupAddCard.classList.add('popup_visible');
}

//функция закрытия окна добавления карточки
function closeAddCardPopupHandler() {
  popupAddCard.classList.remove('popup_visible');
}

//функция отправки формы добавления карточки
function formSubmitCardHandler(evt) {
  evt.preventDefault();
  cardElement = createCard(inputPlace.value, inputImgUrl.value);
  inputPlace.value = "";
  inputImgUrl.value = "";
  cardElements.prepend(cardElement);
  closeAddCardPopupHandler();
}

//функция закрытия окна просмотра фото
function closePopupViewPhoto() {
  popupViewPhoto.classList.remove('popup_visible');
}

//отображаем карточки из массива
initialCards.forEach(element => {
  cardElement = createCard(element.name, element.link);
  cardElements.append(cardElement); 
});

//кнопка редактирования профиля
profileEditButton.addEventListener('click', openPopupHandler);

//кнопка закрытия модального окна редактирвоания профиля
popupCloseButton.addEventListener('click', closePopupHandler);

//кнопка отправки формы редактирования профиля
editForm.addEventListener('submit', formSubmitHandler);

//кнопка добавления карточки
cardsAddButton.addEventListener('click', openAddCardPopupHandler);

//кнопка закрытия модального окна добавления карточки
popupAddCardCloseButton.addEventListener('click', closeAddCardPopupHandler);

//кнопка отправки формы модального окна добавления карточки
addForm.addEventListener('submit', formSubmitCardHandler);

//кнопка закрытия модального окна просмотра фото
popupViewPhotoCloseButton.addEventListener('click', closePopupViewPhoto);
