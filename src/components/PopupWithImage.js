import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(selectorPopupImage) {
        super(selectorPopupImage);

        this._image = this._container.querySelector('.popup__img');
        this._imageCaption = this._container.querySelector('.popup__img-caption');
    }

    open(link, name) {
        this._image.src = link;
        this._image.alt = name;
        this._imageCaption.textContent = name;

        super.open();
    }
}