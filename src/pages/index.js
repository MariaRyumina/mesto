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
    validationConfig
} from "../utils/constants.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import UserService from "../services/UserService.js";
import CardService from "../services/CardService.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";

const formValidatorEditPopup = new FormValidator(validationConfig, formElementEdit);
const formValidatorAddPopup = new FormValidator(validationConfig, formElementAdd);

const popupImage = new PopupWithImage('.popup_content_image');
popupImage.setEventListeners();

//загрузка информации о пользователе с сервера
const userInfo = UserService.getInfo()
    .then(result => {
        const user = new UserInfo({
            selectorName: '.profile__title',
            selectorAbout: '.profile__subtitle',
            selectorAvatar: '.profile__avatar'
        })

        user.setUserInfo(result); // принимает 'name, about' и добавляет их на страницу
        user.setUserAvatar(result);  // принимает 'avatar' и добавляет на страницу

        return user;
    })

//загрузка новой информации о пользователе на сервер и отображение ее на странице
userInfo.then(user => {
    const formEdit = new PopupWithForm({
        selector: '.popup_content_edit',
        submitForm: (inputsForm) => {
            UserService.patchUserInfo(inputsForm) //из инпутов подгружаем на сервер новые 'name, about'
                .catch(err => console.error(err))
            UserService.getInfo() //делаем запрос на сервер
                // .then(info => user.setUserInfo(info)) //получаем новую информацию о пользователь с сервера на страничку
                .then(resp => {
                    if(resp.ok) {

                    }
                })
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

const changeLikeStatus = (id, isLike) => {
    if (isLike) {
        return CardService.dislikeCard(id);
    }
    return CardService.likeCard(id);
}

//функция создания карточки
const createCard = (data, templateSelector, currentUserId, popupImage, popupDelete) => {
    const card = new Card(data, templateSelector, currentUserId, popupImage, popupDelete, changeLikeStatus);
    return card.generateCard();
}

const cardSelection = CardService.getCardList() //загрузка карточек с сервера
    .then(cardList =>  //cardList - массив объектов, который приходит с сервера
        userInfo.then((userInfo) => {
            const cardListSection = new Section({
                    items: cardList,
                    renderer: item => { //проходимся forEach по каждому элементу, создаем новую карточку, добавляем на страницу
                        const cardElement = createCard(item, '#elements', userInfo.getId(), popupImage, popupDelete);
                        cardListSection.addItemStart(cardElement);
                    }
                }, '.elements'
            )
            cardListSection.renderItems();
            return cardListSection;
        })
    );

//открытие попапа подтверждения удаления карточки
const popupDelete = new PopupWithConfirmation({
    popupSelector: '.popup_content_delete',
    submitForm: (element, id) => {
        CardService.deleteCard(id)
            .then(resp => {
                if(resp.ok) {
                    cardSelection.then(section => {
                        section.deleteItem(element)
                    })
                }
            })
        popupDelete.close();
    }
})

//загрузка новой карточки на сервер
const formAdd = new PopupWithForm({
    selector: '.popup_content_add',
    submitForm: (item) => {
        CardService.addCard(item)
            .then(resp => {
                if (resp.ok) {
                    resp.json()
                        .then(card => {
                            userInfo.then(user => {
                                cardSelection.then(selection => {
                                    const cardElement = createCard(card, '#elements', user.getId(), popupImage, popupDelete);
                                    selection.addItemEnd(cardElement);
                                })
                            })

                        })
                }
            })
    }
})
formAdd.setEventListeners();

//открытие попапа Add
buttonOpenAddPopup.addEventListener('click', function () {
    formValidatorAddPopup.cleanValidationMessage();

    formValidatorAddPopup.disableSubmitButton();

    formAdd.open();
});

// const userAvatar = UserService.updateUserAvatar(avatar)
//     .then(result => {
//         console.log(result)
//     })
//
// userAvatar.then(user => {
//     console.log(222, user)
// })


const formEditAvatar = new PopupWithForm({
    selector: '.popup_content_edit-avatar',
    submitForm: avatar => {
        UserService.updateUserAvatar(avatar)
            .then(resp => {
                if (resp.ok) {
                    console.log(resp)
                }
            })
    }
})

//открытие попапа Edit-avatar
buttonOpenEditAvatarPopup.addEventListener('click', function () {
    formValidatorAddPopup.cleanValidationMessage();

    formValidatorAddPopup.disableSubmitButton();

    formEditAvatar.open();
})