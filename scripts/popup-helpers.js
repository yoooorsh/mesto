//функция открытия popup
export function openPopup (popup) {
    popup.classList.add('popup_visible');
    //добавляем в документ слушатель события закрытия модального окна по Esc
    document.addEventListener('keydown', closePopupByEsc);
}
  
  //функция закрытия popup
export function closePopup (popup) {
    popup.classList.remove('popup_visible');
    //удаляем из документа слушатель события закрытия модального окна по Esc
    document.removeEventListener('keydown', closePopupByEsc);
}

//функция закрытия модального окна по нажатию Escape
export function closePopupByEsc (evt) {
    if(evt.key === 'Escape') {
      const visiblePopup = document.querySelector('.popup_visible');
      closePopup(visiblePopup);
    }
}