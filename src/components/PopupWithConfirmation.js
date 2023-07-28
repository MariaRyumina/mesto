import { Popup } from './Popup.js'
export class PopupWithConfirmation extends Popup {
    constructor({ popupSelector, submitForm }) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._container.querySelector('.popup__form');
    }

    open(item) {
        this._item = item;
        super.open();
    }

    apply() {
        if (this._item != null){
            this._submitForm(this._item);
            this._item = null;
        }
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._submitButton = this._form.querySelector('.popup__button');
            this._submitButton.textContent = 'Удаление...';

            this.apply()
        })
    }
}