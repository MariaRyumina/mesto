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
    validationConfig,
    initialCards
} from "../utils/constants.js"
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";

const formValidatorEditPopup = new FormValidator(validationConfig, formElementEdit);
const formValidatorAddPopup = new FormValidator(validationConfig, formElementAdd);

const popupImage = new PopupWithImage('.popup_content_image');
popupImage.setEventListeners();

const createCard = (data, templateSelector, popupImage) => {
    const card = new Card(data, templateSelector, popupImage);
    const cardElement = card.generateCard();

    return cardElement;
}

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = createCard(item, '#elements', popupImage);
        cardList.addItem(cardElement);
    }
}, '.elements')
cardList.renderItems();

const user = new UserInfo({
    selectorName: '.profile__title',
    selectorAbout: '.profile__subtitle'
})

const formEdit = new PopupWithForm({
    selector: '.popup_content_edit',
    submitForm: (inputsForm) => {
        user.setUserInfo(inputsForm);
    }
})
formEdit.setEventListeners();

const formAdd = new PopupWithForm({
    selector: '.popup_content_add',
    submitForm: (item) => {
        const cardElement = createCard(item, '#elements', popupImage);
        cardList.addItem(cardElement);
    }
})
formAdd.setEventListeners();

//открытие попапа Add
buttonOpenAddPopup.addEventListener('click', function () {
    formValidatorAddPopup.cleanValidationMessage();

    formValidatorAddPopup.disableSubmitButton();

    formAdd.open();
});

//открытие попапа Edit
buttonOpenEditPopup.addEventListener('click', function () {
    formValidatorEditPopup.cleanValidationMessage();
    formValidatorEditPopup.enableSubmitButton();

    const userInfo = user.getUserInfo();
    nameInput.value = userInfo.name;
    aboutInput.value = userInfo.about;

    formEdit.open();
})