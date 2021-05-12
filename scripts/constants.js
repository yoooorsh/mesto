//получаем контейнер для элементов
export const cardElements = document.querySelector('.elements');

//получаем элементы для модального окна редактирования профиля
export const profileEditButton = document.querySelector('.profile__edit-button');
export const popupEditProfile = document.querySelector('.popup_content_edit-profile');
export const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close-button');
export const profileName = document.querySelector('.profile__name');
export const profileProfession = document.querySelector('.profile__profession');
export const inputName = popupEditProfile.querySelector('.popup__input_content_name');
export const inputProfession = popupEditProfile.querySelector('.popup__input_content_profession');
export const editForm = popupEditProfile.querySelector('.popup__container');

//получаем элементы для модального окна добавления карточки
export const cardsAddButton = document.querySelector('.profile__add-button');
export const popupAddCard = document.querySelector('.popup_content_add-element');
export const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close-button');
export const inputPlace = popupAddCard.querySelector('.popup__input_content_place');
export const inputImgUrl = popupAddCard.querySelector('.popup__input_content_img-url');
export const addForm = popupAddCard.querySelector('.popup__container');

//получаем элементы для модального окна просмотра фотографии
export const popupViewPhoto = document.querySelector('.popup_content_view-photo');
export const popupViewPhotoCloseButton = popupViewPhoto.querySelector('.popup__close-button');

//получаем все модальные окна в документе
export const popupsArr = Array.from(document.querySelectorAll('.popup'));