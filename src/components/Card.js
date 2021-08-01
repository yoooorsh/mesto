export class Card {
  constructor(data, templateSelector, handleCardClick, handleCardDelete) {
    const {name, link, likes, _id } = data; 
    this._name = name;
    this._link = link;
    this._likeCount = likes.length;
    this._cardId = _id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
  }

  //функция получения шаблона с разметкой для одного элемента (карточки)
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.elements__element').cloneNode(true);
    return cardElement;
  }

  //функция создания карточки, возвращает элемент, готовый для встраивания.
  //устанавливает значения: name - название места и link - ссылка на фото
  createCard() {
    this._cardElement = this._getTemplate();
    this._cardElement.id = this._cardId;
    
    this._cardElement.querySelector('.elements__name').textContent = this._name;
    this._cardElement.querySelector('.elements__photo').src = this._link;
    this._cardElement.querySelector('.elements__photo').alt = this._name;
    this._cardElement.querySelector('.elements__like-counter').textContent = this._likeCount;

    this._setEventListenersLikeBtn();
    this._setEventListenersDeleteBtn();
    this._setEventListenersCardPhoto();

    return this._cardElement;
  }

  //функция устанавливает слушатель на кнопку лайка
  _setEventListenersLikeBtn() {
    const likeButton = this._cardElement.querySelector('.elements__like-button');
    likeButton.addEventListener('click', this._handleLikeButtonActive);
  }

  //функция устанавливает слушатель на кнопку удаления
  _setEventListenersDeleteBtn() {
    const deleteButton = this._cardElement.querySelector('.elements__delete-button');
    deleteButton.addEventListener('click', this._handleCardDelete);
  }

  //функция устанавливает слушатель на фото карточки
  _setEventListenersCardPhoto() {
    const cardPhoto = this._cardElement.querySelector('.elements__photo');
    cardPhoto.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  //функция лайка на карточку
  _handleLikeButtonActive(evt) {
    evt.target.classList.toggle('elements__like-button_active');
  }

  //функция удаления карточки
  // _handleCardDelete(evt) {
  //   evt.target.closest('.elements__element').remove();
  // }
}