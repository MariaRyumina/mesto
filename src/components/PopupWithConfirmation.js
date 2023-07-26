import { Popup } from './Popup.js'
export class PopupWithConfirmation extends Popup {
    constructor({ popupSelector, submitForm }) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = document.querySelector(popupSelector).querySelector('.popup__form');
        this._submitButton = this._form.querySelector('.popup__button_delete');
    }

    open(item) {
        super.open();
        // this._itemId = item._cardId; //объект карточки
        // this._element = element; // dom-элемент
        this.setEventListeners(item);

    }

    deleteCard(item) {
        this._submitForm(item._element, item._cardId)
    }

    setEventListeners(item) {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
        this.deleteCard(item)
        evt.preventDefault();
        // this._submitForm(this._item, this._element);
        // this._submitButton.textContent = 'Удаление...'
        })
    }
}