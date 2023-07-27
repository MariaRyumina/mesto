class CardService {
    constructor(url, header) {
        this._url = url;
        this._header = header;
    }

    //загрузка карточек с сервера
    getCardList() {
        return fetch(`${this._url}`, {
            headers: {
                authorization: this._header
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err))
    }

    //загрузка новой карточки на сервер
    addCard({ name, link}) {
        return fetch(`${this._url}`, {
            method: 'POST',
            headers: {
                authorization: this._header,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                link
            })
        })
            .catch(err => console.error(err))
    }

    //запрос на удаление карточки
    deleteCard(id) {
        return fetch(`${this._url}/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._header,
                'Content-Type': 'application/json'
            }
        })
            .catch(err => console.error(err))
    }

    likeCard(id) {
        return fetch(`${this._url}/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._header,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err))
    }

    dislikeCard(id) {
        return fetch(`${this._url}/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._header,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err))
    }
}

export default new CardService('https://mesto.nomoreparties.co/v1/cohort-71/cards', '4007c4a6-1dc8-477b-8692-004338e6361b')