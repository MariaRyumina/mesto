export class UserInfo {
    constructor({ selectorName, selectorAbout, selectorAvatar }) {
        this._name = document.querySelector(selectorName);
        this._about = document.querySelector(selectorAbout);
        this._avatar = document.querySelector(selectorAvatar);
    }

    // внесение текущих значений из профайла в инпуты
    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent
        }
    }

    // принимает новые данные пользователя и добавляет их на страницу
    setUserInfo({ name, about, _id }) {
        this._name.textContent = name;
        this._about.textContent = about;
        this._id = _id;
    }

    //принимает новый аватар пользователя и добавляет на страницу
    setUserAvatar({ avatar }) {
        this._avatar.src = avatar;
    }
}