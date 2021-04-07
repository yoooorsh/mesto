let profileEditButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');

let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let inputName = document.querySelector('.popup__input_content_name');
let inputProfession = document.querySelector('.popup__input_content_profession');

let editForm = document.querySelector('.popup__container');

if(profileEditButton) {
  profileEditButton.addEventListener('click', function() {
    popup.classList.remove('popup_hidden');
  });
}

popupCloseButton.addEventListener('click', function() {
  popup.classList.add('popup_hidden');
});

inputName.setAttribute('value', profileName.textContent);
inputProfession.setAttribute('value', profileProfession.textContent);

if(editForm) {
  editForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileProfession.textContent = inputProfession.value;
    popup.classList.add('popup_hidden');
  });
}
