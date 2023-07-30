import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor({ selector, submitFormHandler }) {
        super(selector);
        this._submitFormHandler = submitFormHandler;
        this._inputList = this._container.querySelectorAll('.popup__input');
        this._form = this._container.querySelector('.popup__form');
    }

    _getInputValues() {
        const formValue = {}

        this._inputList.forEach(input => {
            formValue[input.name] = input.value;
        })

        return formValue;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._submitFormHandler(this._getInputValues());

            this._submitButton = this._container.querySelector('.popup__button');
            this._submitButton.textContent = "Сохранение...";
        });

        super.setEventListeners();
    }

    close() {
        this._form.reset();

        super.close();
    }
}