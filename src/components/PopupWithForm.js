import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector('.popup__container');
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._data = null;
    this._submitBtn = this._popup.querySelector('.popup__save-button');
    this._btnName = this._submitBtn.textContent;
  }

  setEventListeners() {
    super.setEventListeners(this.close);
    this._form.addEventListener('submit', (event) => this._formSubmit(event, this._data));
  }

  close() {
    this._form.reset();
    this._data = null;
    super.close();
  }

  open(data) {
    this._data = data;
    super.open();
  }

  viewLoader(isLoading) {
    if(isLoading) {
      this._submitBtn.textContent = "Сохранение..."
    } else {
      this._submitBtn.textContent = this._btnName;
    }
  }
}
