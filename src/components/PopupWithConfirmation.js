import { Popup } from './Popup.js'
export class PopupWithConfirmation extends Popup {
    constructor({ popupSelector, submitForm }) {
        super(popupSelector);
        this._submitForm = submitForm;
        // this._form = popupSelector.querySelector('.popup__form');
        // this._submitButton = document.querySelector(popupSelector).querySelector('.popup__button_delete');
    }

    open(item) {
        super.open();
        // this._item = item; //объект карточки
        // this._element = element; // dom-элемент
    }

    deleteCard(id) {
        this._submitForm(id)
    }

    // setEventListeners() {
    //     super.setEventListeners();
    //
    //     this._form.addEventListener('submit', (evt) => {
    //     evt.preventDefault();
    //
    //     this._submitForm(this._item, this._element);
    //     // this._submitButton.textContent = 'Удаление...'
    //     })
    // }
}