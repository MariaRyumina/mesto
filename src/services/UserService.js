import { HEADER_AUTH } from '../utils/constants.js'

class UserService {
    //загрузка информации о пользователе с сервера
    getInfo() {
        return fetch('https://nomoreparties.co/v1/cohort-71/users/me', {
            headers: {
                authorization: HEADER_AUTH
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err))
    }

    //загрузка новой информации о пользователе на сервер
    patchUserInfo({ name, about }) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-71/users/me', {
            method: 'PATCH',
            headers: {
                authorization: HEADER_AUTH,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                about
            })
        })
            .catch(err => console.error(err))
    }

    //обновление аватара пользователя
    updateUserAvatar({ avatar }) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-71/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: HEADER_AUTH,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar
            })
        })
            .catch(err => console.error(err))
    }
}

export default new UserService();