import { Popup } from "./Popup.js";
import { elements, formElementAdd, linkInput, titleInput, initialCards } from "../utils/constants.js";

export class PopupWithForm extends Popup {
    constructor({ selector, submitForm }) {
        super(selector);
        this._submitForm = submitForm;
    }

    _getInputValues() {
        this._inputList = document.querySelectorAll('.popup__input');

        const formValue = {}

        this._inputList.forEach(input => {
            formValue[input.name] = input.value;
        })

        return formValue;
    }

    setEventListeners() {
        this._element = this._container.querySelector('.popup__form');
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._submitForm(this._getInputValues());

            this.close()
        });
    }

    close() {
        this._element.reset();

        super.close();
    }
}