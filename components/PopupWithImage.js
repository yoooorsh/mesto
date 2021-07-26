import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
    constructor(data, popupSelector){
        super(popupSelector);
        this._url = data.url;
        this._title = data.title;
    }
    
    open() {

    }
}