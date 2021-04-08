let profileEditButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');

let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let inputName = document.querySelector('.popup__input_content_name');
let inputProfession = document.querySelector('.popup__input_content_profession');

let editForm = document.querySelector('.popup__container');

function openPopupHandler() {
  popup.classList.add('popup_visible');
  inputName.setAttribute('value', profileName.textContent);
  inputProfession.setAttribute('value', profileProfession.textContent);
}

function closePopupHandler() {
  popup.classList.remove('popup_visible');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  popup.classList.remove('popup_visible');
}

profileEditButton.addEventListener('click', openPopupHandler);

popupCloseButton.addEventListener('click', closePopupHandler);

editForm.addEventListener('submit', formSubmitHandler);
