
class UserService {
    constructor(url, header) {
        this._url = url;
        this._header = header;
    }
    //загрузка информации о пользователе с сервера
    getInfo() {
        return fetch(`${this._url}`, {
            headers: {
                authorization: this._header
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err))
    }

    //загрузка новой информации о пользователе на сервер
    patchUserInfo({ name, about }) {
        return fetch(`${this._url}`, {
            method: 'PATCH',
            headers: {
                authorization: this._header,
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
        return fetch(`${this._url}/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._header,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar
            })
        })
            .catch(err => console.error(err))
    }
}

export default new UserService('https://mesto.nomoreparties.co/v1/cohort-71/users/me', '4007c4a6-1dc8-477b-8692-004338e6361b');