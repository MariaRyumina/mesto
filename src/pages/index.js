import "../styles/index.css";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import {
    formElementEdit,
    formElementAdd,
    buttonOpenEditPopup,
    buttonOpenAddPopup,
    buttonOpenEditAvatarPopup,
    nameInput,
    aboutInput,
    validationConfig,
    formElementAvatar,
    buttonSubmitEdit,
    buttonSubmitDelete,
    buttonSubmitAdd,
    buttonSubmitEditAvatar
} from "../utils/constants.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { api } from "../components/Api.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";

//попап просмотра карточки
const popupImage = new PopupWithImage('.popup_content_image');
popupImage.setEventListeners();

const formValidatorEditPopup = new FormValidator(validationConfig, formElementEdit);
const formValidatorAddPopup = new FormValidator(validationConfig, formElementAdd);
const formValidatorAvatarPopup = new FormValidator(validationConfig, formElementAvatar);

const user = new UserInfo({
    selectorName: '.profile__title',
    selectorAbout: '.profile__subtitle',
    selectorAvatar: '.profile__avatar'
})

let currentUserId;

//функция создания карточки
const createCard = (data, templateSelector, popupImage, popupDelete) => {
    const card = new Card(data, templateSelector, popupImage, popupDelete, changeLikeStatus, currentUserId);
    return card.generateCard();
}

const cardListSection = new Section({
    renderer: item => { //проходимся forEach по каждому элементу, создаем новую карточку, добавляем на страницу
        const cardElement = createCard(item, '#elements', popupImage, popupDelete);
        cardListSection.addItemEnd(cardElement);
    }
}, '.elements')

//загрузка информации о пользователе и карточек с сервера
Promise.all([api.getUserInfo(), api.getCardList()])

    .then(( [resultUser, resultCard] ) => {
        currentUserId = resultUser._id
        user.setUserInfo(resultUser); // принимаем 'name, about' и добавляем их на страницу
        user.setUserAvatar(resultUser); // принимаем 'avatar' и добавляем на страницу

        cardListSection.renderItems(resultCard); //принимаем карточки и отрисовываем их на странице
    })
    .catch(err => console.log(`Ошибка загрузки данных с сервера: ${err}`))

//редактирование профиля, загрузка новой информации на сервер и отображение ее на странице
const formEdit = new PopupWithForm({
    selector: '.popup_content_edit',
    submitFormHandler: (inputsForm) => {
        api.patchUserInfo(inputsForm) //из инпутов подгружаем на сервер новые 'name, about'
            .then(info => user.setUserInfo(info)) //получаем новую информацию о пользователь с сервера на страничку
            .then(() => formEdit.close())
            .catch(err => console.error(err))
            .finally(() => buttonSubmitEdit.textContent = "Сохранить")
    }
})
formEdit.setEventListeners();

buttonOpenEditPopup.addEventListener('click', function () { //открытие попапа Edit
    formValidatorEditPopup.cleanValidationMessage(); //проверка валидации
    formValidatorEditPopup.enableSubmitButton();

    const userInfo = user.getUserInfo(); //внесение текущих значений из профайла в инпуты при открытии
    nameInput.value = userInfo.name;
    aboutInput.value = userInfo.about;

    formEdit.open();
})

//создание новой карточки и загрузка ее на сервер
const formAdd = new PopupWithForm({
    selector: '.popup_content_add',
    submitFormHandler: (item) => {
        api.addCard(item)
            .then(card => {
                const cardElement = createCard(card, '#elements', popupImage, popupDelete);
                cardListSection.addItemStart(cardElement)
            })
            .then(() => formAdd.close())
            .catch(err => console.error(err))
            .finally(() => buttonSubmitAdd.textContent = "Создать")
    }
})
formAdd.setEventListeners();

buttonOpenAddPopup.addEventListener('click', function () { //открытие попапа Add
    formValidatorAddPopup.cleanValidationMessage(); //проверка валидации
    formValidatorAddPopup.disableSubmitButton();

    formAdd.open();
});

//подтверждения удаления карточки
const popupDelete = new PopupWithConfirmation({
    popupSelector: '.popup_content_delete',
    submitFormHandler: (card) => {
        api.deleteCard(card.getCardId())
            .then(() => card.deleteItem())
            .then(() => popupDelete.close())
            .catch(err => console.error(err))
            .finally(() => buttonSubmitDelete.textContent = "Да")
    }
})
popupDelete.setEventListeners()

//постановка и снятие лайка
const changeLikeStatus = (card) => {
    let resp
    if (card.isLike()) {
        resp = api.dislikeCard(card.getCardId())
    } else {
        resp = api.likeCard(card.getCardId())
    }
    resp.then(resp => card.changeLikeStatus(resp.likes))
        .catch(err => console.error(err))
}

const formEditAvatar = new PopupWithForm({
    selector: '.popup_content_edit-avatar',
    submitFormHandler: avatar => {
        api.updateUserAvatar(avatar)
            .then(() => user.setUserAvatar(avatar))
            .then(() => formEditAvatar.close())
            .catch(err => console.error(err))
            .finally(() => buttonSubmitEditAvatar.textContent = "Сохранить")
    }
})
formEditAvatar.setEventListeners()

buttonOpenEditAvatarPopup.addEventListener('click', function () { //открытие попапа Edit-avatar
    formValidatorAvatarPopup.cleanValidationMessage(); //проверка валидации
    formValidatorAvatarPopup.disableSubmitButton();

    formEditAvatar.open();
})