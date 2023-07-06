import { Popup } from "./Popup.js";
import { elements, formElementAdd, linkInput, titleInput } from "../utils/constants.js";

export class PopupWithForm extends Popup {
    constructor(selector, submitForm) {
        super(selector);
        this._submitForm = submitForm;
    }

    _getInputValues() {

        // const newCard = {
        //     name: titleInput.value,
        //     link: linkInput.value
        // }
        //
        // popupFormAdd.close();
        //
        // elements.prepend(card(newCard, '#elements').generateCard());
    }

    setEventListeners() {
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._element.reset();

            this._submitForm()
        });
    }

    close() {
        super.close();
    }
}