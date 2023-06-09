import { PopupWithImage } from "./PopupWithImage.js";

export class Card {
    constructor(data, templateSelector) {
        this._name = data.title;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this.openPopupImage = new PopupWithImage();
    }

    // получаем шаблон карточки
    _getTemplate() {
        return document.querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true)
    }

    generateCard() {
        this._element = this._getTemplate();

        this._element.querySelector('.element__title').textContent = this._name;
        this._imageElement = this._element.querySelector('.element__img');
        this._imageElement.alt = this._name;
        this._imageElement.src = this._link;

        this._deleteElement = this._element.querySelector('.element__delete');
        this._likeElement = this._element.querySelector('.element__like');
        this._setEventListeners();

        return this._element;
    }

    _likeCard() {
        this._likeElement.classList.toggle('element__like_active');
    }

    _deleteCard() {
        this._element.remove();
    }

    _setEventListeners() {
        this._likeElement.addEventListener('click', () => this._likeCard());
        this._deleteElement.addEventListener('click', () => this._deleteCard());
        this._imageElement.addEventListener('click', () => this.openPopupImage.open(this._link, this._name));
    }
}