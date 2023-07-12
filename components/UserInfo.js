import {
    aboutInput,
    formElementEdit,
    nameInput,
    profileAbout,
    profileName
} from "../utils/constants.js";

export class UserInfo {
    constructor({ selectorName, selectorInfo }) {
        this._name = selectorName;
        this._info = selectorInfo;
    }

    //подгрузка информации со странички в поля формы popupEdit
    getUserInfo() {
    }

    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo() {
    }
}

// внесение текущих значений из профайла в инпуты
const preloadEditPopup = () => {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
}
preloadEditPopup();

//закрытие попапа Edit через кнопку "Сохранить" и добавление новых значение в профайл
const handleFormSubmitEdit = (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    popupFormEdit.close();
}
formElementEdit.addEventListener('submit', handleFormSubmitEdit);