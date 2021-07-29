import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector('.popup__container');
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  _setEventListeners() {
    super.setEventListeners(this.close);
    this._form.addEventListener('submit', this._formSubmit);
    this._form.addEventListener('submit', this.close);
  }

  open() {
    this._setEventListeners();
    super.open();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
