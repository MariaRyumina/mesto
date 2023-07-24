import "../styles/index.css";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import {
    formElementEdit,
    formElementAdd,
    buttonOpenEditPopup,
    buttonOpenAddPopup,
    nameInput,
    aboutInput,
    validationConfig
} from "../utils/constants.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import UserService from "../services/UserService.js";
import CardService from "../services/CardService.js";

const formValidatorEditPopup = new FormValidator(validationConfig, formElementEdit);
const formValidatorAddPopup = new FormValidator(validationConfig, formElementAdd);

const popupImage = new PopupWithImage('.popup_content_image');
popupImage.setEventListeners();

UserService.getInfo() //Загрузка информации о пользователе с сервера
    .then(result => {
        const user = new UserInfo({
            selectorName: '.profile__title',
            selectorAbout: '.profile__subtitle',
            selectorAvatar: '.profile__avatar'
        })

        user.setUserInfo(result); // принимает новые данные пользователя и добавляет их на страницу
        user.setUserAvatar(result);  // принимает новые данные пользователя и добавляет их на страницу

        return user;
    })

    .then(user => {
        const formEdit = new PopupWithForm({
            selector: '.popup_content_edit',
            submitForm: (inputsForm) => {
                UserService.patchUserInfo(inputsForm);
                UserService.getInfo()
                    .then(info => user.setUserInfo(info));
            }
        })
        formEdit.setEventListeners();

        //открытие попапа Edit
        buttonOpenEditPopup.addEventListener('click', function () {
            formValidatorEditPopup.cleanValidationMessage();
            formValidatorEditPopup.enableSubmitButton();

            const userInfo = user.getUserInfo();
            nameInput.value = userInfo.name;
            aboutInput.value = userInfo.about;

            formEdit.open();
        })
    })

const cardListSelection = () => {
    CardService.getCardList()
        .then(cardList => {
            const cardListSection = new Section({
                    items: cardList,
                    renderer: item => {
                        const cardElement = createCard(item, '#elements', popupImage);
                        cardListSection.addItem(cardElement);
                    }
                }, '.elements'
            )
            cardListSection.renderItems();
            return cardListSection;
        })
}
cardListSelection();

const createCard = (data, templateSelector, popupImage) => {
    const card = new Card(data, templateSelector, popupImage);
    const cardElement = card.generateCard();

    return cardElement;
}

const formAdd = new PopupWithForm({
    selector: '.popup_content_add',
    submitForm: (item) => {
        CardService.addCard(item) //TODO как добавить картинку без перезагрузки
    }
})
formAdd.setEventListeners();

//открытие попапа Add
buttonOpenAddPopup.addEventListener('click', function () {
    formValidatorAddPopup.cleanValidationMessage();

    formValidatorAddPopup.disableSubmitButton();

    formAdd.open();
});