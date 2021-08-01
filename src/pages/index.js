import './index.css';
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { settingsElems } from "../utils/settings.js";
import { 
  cardElementsSelector, 
  profileEditButtonSelector, 
  profileNameSelector,
  profileProfessionSelector,
  profilePhotoSelector,
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
  popupDeleteConfirmationSelector
 } from "../utils/constants.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js"

//создаём объекты валидаторов форм
const validatorEditForm = new FormValidator({...settingsElems, openFormBtnSelector: profileEditButtonSelector}, editForm);
const validatorAddForm = new FormValidator({...settingsElems, openFormBtnSelector: cardsAddButtonSelector}, addForm);

const userInfo = new UserInfo(profileNameSelector, profileProfessionSelector);
const popupViewPhoto = new PopupWithImage(popupViewPhotoSelector);

let cards;
let curUserId;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: 'febe2ee3-a098-4028-9a86-63d42bc45ba2',
    'Content-Type': 'application/json'
  }
});

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
  api.setUserInfo(inputName.value, inputProfession.value)
    .then(data => {
      userInfo.setUserInfo(data.name, data.about);
      editProfilePopup.close();
    });
});

const addCardPopup = new PopupWithForm(popupAddCardSelector, (event) => {
  event.preventDefault();
  api.addNewCard(inputPlace.value, inputImgUrl.value)
    .then(data => {
      const cardElement = createCard(data);
      cards.addItemToStart(cardElement);
      addCardPopup.close();
    });
});

const popupDeleteConfirmation = new PopupWithForm(popupDeleteConfirmationSelector, (event, data) => {
  event.preventDefault();
  const {_id} = data;

  if (_id) {
    api.deleteCard(_id)
      .then(() => {
        document.getElementById(_id).remove();
        popupDeleteConfirmation.close();
      });
  }
});

popupViewPhoto.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
popupDeleteConfirmation.setEventListeners();

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

function createCard(data) {
  const {owner} = data;
  const card = new Card(data, '#element', popupViewPhoto.open, () => popupDeleteConfirmation.open(data));
  const cardElement = card.createCard();

  if(owner._id != curUserId) {
    cardElement.querySelector('.elements__delete-button').remove();
  }

  return cardElement;
}

//кнопка редактирования профиля
const profileEditButton = document.querySelector(profileEditButtonSelector);
profileEditButton.addEventListener('click', handleEditProfilePopupOpen);

//кнопка добавления карточки
const cardsAddButton = document.querySelector(cardsAddButtonSelector);
cardsAddButton.addEventListener('click', handleAddCardPopupOpen);

//запускаем валидацию форм
validatorEditForm.enableValidation();
validatorAddForm.enableValidation();