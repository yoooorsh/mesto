import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor({link, name}, popupSelector){
        super(popupSelector);
        this._link = link;
        this._name = name;
    }
    
    open() {
        const popupPhoto = this._popup.querySelector('.popup__photo');
        const popupPhotoName = this._popup.querySelector('.popup__photo-name');
        
        popupPhoto.src = this._link;
        popupPhoto.alt = this._name;
        popupPhotoName.textContent = this._name;

        super.open();
        super.setEventListeners(this.close);
    }
}