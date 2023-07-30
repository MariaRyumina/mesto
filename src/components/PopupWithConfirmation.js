import { Popup } from './Popup.js'
export class PopupWithConfirmation extends Popup {
    constructor({ popupSelector, submitFormHandler }) {
        super(popupSelector);
        this._submitFormHandler = submitFormHandler;
        this._form = this._container.querySelector('.popup__form');
    }

    open(item) {
        this._item = item;
        super.open();
    }

    apply() {
        if (this._item != null) {
            this._submitFormHandler(this._item);
            this._item = null;
        }
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._submitButton = this._container.querySelector('.popup__button');
            this._submitButton.textContent = 'Удаление...';

            this.apply()
        })
    }
}