import { Popup } from './Popup.js'
export class PopupWithConfirmation extends Popup {
    constructor({ popupSelector, submitForm }) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = document.querySelector(popupSelector).querySelector('.popup__form');
    }

    open(item) {
        super.open();

        this.setEventListeners(item);
    }

    deleteCard(item) {
        this._submitForm(item._element, item._cardId)
    }

    setEventListeners(item) {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._submitButton = this._form.querySelector('.popup__button');
            this._submitButton.textContent = 'Удаление...';

            this.deleteCard(item)

        })
    }
}