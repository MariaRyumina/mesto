export class OldCard {
    constructor (data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    _addAttribute () {
        this._templateSelector.querySelector('.element__title').textContent = this._name;
        this._templateSelector.querySelector('.element__img').alt = this._name;
        this._templateSelector.querySelector('.element__img').src = this._link;
    }

    createNewCard (openPopup) {
        _addAttribute ();
        this._templateSelector.querySelector('.element__like').addEventListener('click', likeButton);
        this._templateSelector.querySelector('.element__delete').addEventListener('click', deleteCard);
        this._templateSelector.querySelector('.element__img').addEventListener('click', () => {
            document.querySelector('.popup__img').src = this._link;
            document.querySelector('.popup__img').alt = this._name;
            document.querySelector('.popup__img-caption').textContent = this._name;
            openPopup(document.querySelector('.popup_content_image'));
        });

        return this._templateSelector;
    }
}

//лайк карточке
const likeButton = (evt) => {
    const like = evt.target.closest('.element__like')
    like.classList.toggle('element__like_active');
}

//удаление карточки
const deleteCard = (evt) => {
    const card = evt.target.closest('.element');
    card.remove();
}



