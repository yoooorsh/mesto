import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
    constructor(formSubmit, popupSelector) {
        super(popupSelector);
        this._formSubmit = formSubmit;
    }

    _getInputValues() {

    }

    setEventListeners() {

    }

    close() {
        
    }
}