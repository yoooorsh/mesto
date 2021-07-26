export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_visible');
        document.addEventListener('keydown', _handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_visible');
        document.removeEventListener('keydown', _handleEscClose);
    }

    _handleEscClose(evt) {
        if(evt.key === 'Escape') {
            close();
          }
    }

    setEventListeners(callback) {
        const closeBtn = this._popup.querySelector('.popup__close-button');
        closeBtn.addEventListener('click', callback);
    }
}