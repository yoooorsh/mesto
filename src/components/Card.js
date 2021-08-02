import { api } from "../components/Api.js";

export class Card {
  constructor(
    data, 
    templateSelector, 
    handleCardClick, 
    handleCardDelete, 
    isShowDeleteBtn,
    isActiveLikeBtn
    ) {
    const {name, link, likes, _id , owner} = data; 
    this._name = name;
    this._link = link;
    this._likeCount = likes.length;
    this._cardId = _id;
    this._owner = owner;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._isShowDeleteBtn = isShowDeleteBtn;
    this._isActiveLikeBtn = isActiveLikeBtn;
    this._handleLikeButtonActive = this._handleLikeButtonActive.bind(this);
    this._handleLikeButtonInactive = this._handleLikeButtonInactive.bind(this);
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

    if (this._isShowDeleteBtn) {
      this._setEventListenersDeleteBtn();
    } else {
      this._cardElement.querySelector('.elements__delete-button').remove();
    }
   
    if(this._isActiveLikeBtn) {
      this._cardElement.querySelector('.elements__like-button').classList.add('elements__like-button_active');
      this._setEventListenersActiveLikeBtn();
    } else {
      this._setEventListenersInactiveLikeBtn();
    }

    this._setEventListenersCardPhoto();

    return this._cardElement;
  }

  //функция устанавливает слушатель на кнопку лайка, когда она неактивна
  _setEventListenersInactiveLikeBtn() {
    const likeButton = this._cardElement.querySelector('.elements__like-button');
    likeButton.addEventListener('click', this._handleLikeButtonActive, {once: true});
  }

  //функция устанавливает слушатель на кнопку лайка, когда она активна
  _setEventListenersActiveLikeBtn() {
    const likeButton = this._cardElement.querySelector('.elements__like-button');
    likeButton.addEventListener('click', this._handleLikeButtonInactive, {once: true});
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

  _handleLikeButtonActive() {
    api.setLike(this._cardId)
      .then(data => {
        this._updateLikes(data.likes.length);
        this._setEventListenersActiveLikeBtn();
      });
  }

  _handleLikeButtonInactive() {
    api.removeLike(this._cardId)
      .then(data => {
        this._updateLikes(data.likes.length);
        this._setEventListenersInactiveLikeBtn();
      });
  }

  //обновляет счётчик лайков и состояние кнопки лайка
  _updateLikes(likeCount) {
    const likeButton = this._cardElement.querySelector('.elements__like-button');
    const likeCounter = this._cardElement.querySelector('.elements__like-counter');
    
    likeButton.classList.toggle('elements__like-button_active');
    likeCounter.textContent = likeCount;
  }
}