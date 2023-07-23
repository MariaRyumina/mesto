import { HEADER_AUTH } from "../utils/constants.js";
import { Section } from "../components/Section.js";

class CardService{
    getCardList() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-71/cards', {
            headers: {
                authorization: HEADER_AUTH
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err))

    }

    addCard({ name, link}) {
        fetch('https://mesto.nomoreparties.co/v1/cohort-71/cards', {
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

    deleteCard() {}

    changeStatusLike() {}
}

export default new CardService()