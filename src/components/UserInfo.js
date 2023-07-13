export class UserInfo {
    constructor({ selectorName, selectorAbout }) {
        this._name = document.querySelector(selectorName);
        this._about = document.querySelector(selectorAbout);
    }

    // внесение текущих значений из профайла в инпуты
    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent
        }
    }

    // принимает новые данные пользователя и добавляет их на страницу
    setUserInfo({ name, about }) {
        this._name.textContent = name;
        this._about.textContent = about;
    }
}