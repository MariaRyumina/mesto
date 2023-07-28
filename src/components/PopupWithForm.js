import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor({ selector, submitForm }) {
        super(selector);
        this._submitForm = submitForm;
        this._inputList = this._container.querySelectorAll('.popup__input');
        this._element = this._container.querySelector('.popup__form');

    }

    _getInputValues() {
        const formValue = {}

        this._inputList.forEach(input => {
            formValue[input.name] = input.value;
        })

        return formValue;
    }

    setEventListeners() {
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._submitForm(this._getInputValues());

            this._submitButton = this._element.querySelector('.popup__button');
            this._submitButton.textContent = "Сохранение...";
        });

        super.setEventListeners();
    }

    close() {
        this._element.reset();

        super.close();
    }


}