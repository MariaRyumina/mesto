import { Popup } from './Popup.js'
export class PopupWithConfirmation extends Popup {
    constructor({ popupSelector, submitForm }) {
        super(popupSelector);
        this._submitForm = submitForm;
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

        this._container.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._submitButton = this._container.querySelector('.popup__button');
            this._submitButton.textContent = 'Удаление...';

            this.apply()
        })
    }
}