export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
        this.setEventListeners = this.setEventListeners.bind(this);
    }

    open() {
        this._popup.classList.add('popup_visible');
        document.addEventListener('keydown', this._handleEscClose);
        document.addEventListener('click', this._handleOverlayClose);
    }

    close() {
        this._popup.classList.remove('popup_visible');
        document.removeEventListener('keydown', this._handleEscClose);
        document.removeEventListener('click', this._handleOverlayClose);
    }

    _handleEscClose(evt) {
        if(evt.key === 'Escape') {
            this.close();
          }
    }

    _handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup')) {
            this.close();
          }
    }

    setEventListeners() {
        const closeBtn = this._popup.querySelector('.popup__close-button');
        closeBtn.addEventListener('click', this.close);
    }
}