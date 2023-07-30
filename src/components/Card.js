export class Card {
    constructor(data, templateSelector, popupImage, popupDelete, likeCallback, currentUserId) {
        this._name = data.name;
        this._link = data.link;
        this._cardId = data._id;
        this._userId = data.owner._id;
        this._likes = data.likes;
        this._templateSelector = templateSelector;
        this._popupImage = popupImage;
        this._popupDelete = popupDelete;
        this._likeCallback = likeCallback;
        this._currentUserId = currentUserId;
    }

    // получаем шаблон карточки
    _getTemplate() {
        return document.querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true)
    }

    getCardId(){
        return this._cardId
    }

    isLike(){
        return this._isLike;
    }

    generateCard() {
        this._element = this._getTemplate();

        this._element.querySelector('.element__title').textContent = this._name;
        this._imageElement = this._element.querySelector('.element__img');
        this._imageElement.alt = this._name;
        this._imageElement.src = this._link;

        this._deleteElement = this._element.querySelector('.element__delete');
        if (this._userId !== this._currentUserId) {
            this._deleteElement.style.display = "none";
        }

        this._likeCount = this._element.querySelector('.element__like-count');
        this._likeElement = this._element.querySelector('.element__like');

        this.changeLikeStatus(this._likes);

        this._setEventListeners();

        return this._element;
    }

    changeLikeStatus(likes) {
        this._likes = likes;

        this._likeCount.textContent = this._likes.length;
        this._isLike = this._likes.some(like => like._id === this._currentUserId);

        if (this._isLike) {
            this._likeElement.classList.add('element__like_active');
        } else {
            this._likeElement.classList.remove('element__like_active');
        }
    }

    _likeCard() {
        this._likeCallback(this);
    }

    deleteItem() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._likeElement.addEventListener('click', () => this._likeCard());

        this._deleteElement.addEventListener('click', () => this._popupDelete.open(this));

        this._imageElement.addEventListener('click', () => this._popupImage.open(this._link, this._name));
    }
}