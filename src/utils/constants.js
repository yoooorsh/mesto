//получаем контейнер для элементов
export const cardElementsSelector = '.elements';

//получаем элементы для модального окна редактирования профиля
export const profileEditButtonSelector = '.profile__edit-button';
export const popupEditProfileSelector = '.popup_content_edit-profile';
export const profileNameSelector = '.profile__name';
export const profileProfessionSelector = '.profile__profession';

export const inputName = document.querySelector('.popup__input_content_name');
export const inputProfession = document.querySelector('.popup__input_content_profession');
export const editForm = document
  .querySelector(popupEditProfileSelector)
  .querySelector('.popup__container');

//Селекторы для смены аватара
export const avatarEditBtnSelector = '.profile__avatar-edit-button';
export const profilePhotoSelector = '.profile__photo';
export const popupEditAvatarSelector = '.popup_content_edit-avatar';
export const inputPhotoUrl = document.querySelector('.popup__input_content_avatar-url');
export const editAvatarForm = document
  .querySelector(popupEditAvatarSelector)
  .querySelector('.popup__container');

//получаем элементы для модального окна добавления карточки
export const cardsAddButtonSelector = '.profile__add-button';
export const popupAddCardSelector = '.popup_content_add-element';
export const inputPlace = document.querySelector('.popup__input_content_place');
export const inputImgUrl = document.querySelector('.popup__input_content_img-url');
export const addForm = document
  .querySelector(popupAddCardSelector)
  .querySelector('.popup__container');

//получаем элементы для модального окна просмотра фотографии
export const popupViewPhotoSelector = '.popup_content_view-photo';

//получаем все модальные окна в документе
export const popupDeleteConfirmationSelector = '.popup_content_delete-confirmation';