import './index.css';
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { settingsElems } from "../utils/settings.js";
import { 
  cardElementsSelector, 
  profileEditButtonSelector, 
  profileNameSelector,
  profileProfessionSelector,
  inputName,
  inputProfession,
  editForm,
  avatarEditBtnSelector,
  profilePhotoSelector,
  inputPhotoUrl,
  popupEditAvatarSelector,
  editAvatarForm,
  cardsAddButtonSelector,
  popupAddCardSelector,
  inputPlace,
  inputImgUrl,
  addForm,
  popupEditProfileSelector,
  popupViewPhotoSelector,
  popupDeleteConfirmationSelector
 } from "../utils/constants.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { api } from "../components/Api.js"

//создаём объекты валидаторов форм
const validatorEditForm = new FormValidator({...settingsElems, openFormBtnSelector: profileEditButtonSelector}, editForm);
const validatorAddForm = new FormValidator({...settingsElems, openFormBtnSelector: cardsAddButtonSelector}, addForm);
const validatorEditAvatarForm = new FormValidator({...settingsElems, openFormBtnSelector: avatarEditBtnSelector}, editAvatarForm);

const userInfo = new UserInfo(profileNameSelector, profileProfessionSelector, profilePhotoSelector);
const popupViewPhoto = new PopupWithImage(popupViewPhotoSelector);

let cards;
let curUserId;

api.getInitialCards()
  .then(data => {
    cards = new Section({
      items: data,
      renderer: (item) => {
        const cardElement = createCard(item);
        cards.addItem(cardElement);
      },
    }, cardElementsSelector);
    cards.renderItems();
  });

const editProfilePopup = new PopupWithForm(popupEditProfileSelector, (event) => {
  event.preventDefault();
  editProfilePopup.viewLoader(true);
  api.setUserInfo(inputName.value, inputProfession.value)
    .then(data => {
      userInfo.setUserInfo(data.name, data.about);
      editProfilePopup.close();
    })
    .finally(() => editProfilePopup.viewLoader(false));
});

const addCardPopup = new PopupWithForm(popupAddCardSelector, (event) => {
  event.preventDefault();
  addCardPopup.viewLoader(true);
  api.addNewCard(inputPlace.value, inputImgUrl.value)
    .then(data => {
      const cardElement = createCard(data);
      cards.addItemToStart(cardElement);
      addCardPopup.close();
    })
    .finally(() => addCardPopup.viewLoader(false));
});

const popupDeleteConfirmation = new PopupWithForm(popupDeleteConfirmationSelector, (event, data) => {
  event.preventDefault();
  popupDeleteConfirmation.viewLoader(true);
  const {_id} = data;

  if (_id) {
    api.deleteCard(_id)
      .then(() => {
        document.getElementById(_id).remove();
        popupDeleteConfirmation.close();
      })
      .finally(() => popupDeleteConfirmation.viewLoader(false));
  }
});

const editAvatarPopup = new PopupWithForm(popupEditAvatarSelector, (event) => {
  event.preventDefault();
  api.setAvatarPhoto(inputPhotoUrl.value)
    .then(data => {
      userInfo.setAvatarPhoto(data.avatar);
      editAvatarPopup.close();
    });
});

popupViewPhoto.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
popupDeleteConfirmation.setEventListeners();
editAvatarPopup.setEventListeners();

api.getUserInfo()
  .then(data => {
    document.querySelector(profileNameSelector).textContent = data.name;
    document.querySelector(profileProfessionSelector).textContent = data.about;
    document.querySelector(profilePhotoSelector).src = data.avatar;
    curUserId = data._id;
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

//функция открытия окна редактирования профиля
function handleEditAvatarPopupOpen() {
  editAvatarPopup.open();
  const {photoLink} = userInfo.getUserInfo();
  inputPhotoUrl.value = photoLink;
}

function createCard(data) {
  const {likes, owner} = data;
  const isShowDeleteBtn = owner._id === curUserId;
  const isActiveLikeBtn = likes.some(user => {
    return user._id === curUserId;
  });

  const card = new Card(
    data, 
    '#element', 
    popupViewPhoto.open, 
    () => popupDeleteConfirmation.open(data), 
    isShowDeleteBtn, 
    isActiveLikeBtn
  );

  const cardElement = card.createCard();

  return cardElement;
}

//кнопка редактирования профиля
const profileEditButton = document.querySelector(profileEditButtonSelector);
profileEditButton.addEventListener('click', handleEditProfilePopupOpen);

//кнопка добавления карточки
const cardsAddButton = document.querySelector(cardsAddButtonSelector);
cardsAddButton.addEventListener('click', handleAddCardPopupOpen);

//кнопка смены аватара
const avatarEditBtn = document.querySelector(avatarEditBtnSelector);
avatarEditBtn.addEventListener('click', handleEditAvatarPopupOpen)

//запускаем валидацию форм
validatorEditForm.enableValidation();
validatorAddForm.enableValidation();
validatorEditAvatarForm.enableValidation();