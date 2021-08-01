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
}
