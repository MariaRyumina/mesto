import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(selectorPopupImage) {
        super(selectorPopupImage);

        const popupImage = document.querySelector(selectorPopupImage);
        this._image = popupImage.querySelector('.popup__img');
        this._imageCaption = popupImage.querySelector('.popup__img-caption');
    }

    open(link, name) {
        this._image.src = link;
        this._image.alt = name;
        this._imageCaption.textContent = name;

        super.open();
    }
}