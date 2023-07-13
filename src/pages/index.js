import "../styles/index.css";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import {
    formElementEdit,
    formElementAdd,
    buttonOpenEditPopup,
    buttonOpenAddPopup,
    popupEdit,
    popupAdd,
    nameInput,
    aboutInput,
    validationConfig,
    initialCards,
    elements
} from "../utils/constants.js"
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";
import {UserInfo} from "../components/UserInfo.js";

const formValidatorEditPopup = new FormValidator(validationConfig, formElementEdit);
const formValidatorAddPopup = new FormValidator(validationConfig, formElementAdd);

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = new Card(item, '#elements').generateCard();
        cardList.addItem(cardElement);
    }
}, elements)

cardList.renderItems();

const user = new UserInfo({
    selectorName: '.profile__title',
    selectorAbout: '.profile__subtitle'
})

const formEdit = new PopupWithForm({
    selector: popupEdit,
    submitForm: (inputsForm) => {
        user.setUserInfo(inputsForm);
    }
})

const formAdd = new PopupWithForm({
    selector: popupAdd,
    submitForm: (item) => {
        const cardElement = new Card(item, '#elements').generateCard();
        cardList.addItem(cardElement);
    }
})

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

    nameInput.value = user.getUserInfo().name;
    aboutInput.value = user.getUserInfo().about;

    formEdit.open();
})