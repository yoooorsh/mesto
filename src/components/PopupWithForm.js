import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit.bind(this);
    this._form = this._popup.querySelector('.popup__container');
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._data = null;
    this._submitBtn = this._popup.querySelector('.popup__save-button');
    this._btnName = this._submitBtn.textContent;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => this._handleFormSubmit(event, {...this._getInputValues(), ...this._data }));
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
