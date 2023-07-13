import { Popup } from "./Popup.js";
import { image, imageCaption, popupImage } from "../utils/constants.js";

export class PopupWithImage extends Popup {
    constructor() {
        super(popupImage);
    }

    open(link, name) {
        image.src = link;
        image.alt = name;
        imageCaption.textContent = name;

        super.open();
    }
}