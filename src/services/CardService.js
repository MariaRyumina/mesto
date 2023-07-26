import { HEADER_AUTH } from "../utils/constants.js";

class CardService {
    constructor(url, header) {
        this._url = url;
        this._header = header;
    }

    //загрузка карточек с сервера
    getCardList() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-71/cards', {
            headers: {
                authorization: HEADER_AUTH
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err))
    }

    //загрузка новой карточки на сервер
    addCard({ name, link}) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-71/cards', {
            method: 'POST',
            headers: {
                authorization: HEADER_AUTH,
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
        fetch(`https://mesto.nomoreparties.co/v1/cohort-71/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: HEADER_AUTH,
                'Content-Type': 'application/json'
            }
        })
            .catch(err => console.error(err))
    }

    likeCard(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-71/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: HEADER_AUTH,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err))
    }

    dislikeCard(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-71/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: HEADER_AUTH,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err))
    }
}

export default new CardService()