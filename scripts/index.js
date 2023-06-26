import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

// -----------------------------------------------------------------
// POPUP EDIT/ADD
// -----------------------------------------------------------------
const formElementEdit = document.querySelector('.popup__form_edit');
const formElementAdd = document.querySelector('.popup__form_add');
const buttonOpenEditPopup = document.querySelector('.profile__button-edit');
const buttonOpenAddPopup = document.querySelector('.profile__button-add');
const popupEdit = document.querySelector('.popup_content_edit');
const popupAdd = document.querySelector('.popup_content_add');
const nameInput = document.querySelector('.popup__input_value_name');
const aboutInput = document.querySelector('.popup__input_value_about');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const buttonsClosePopup = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

const preloadEditPopup = () => {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
}

preloadEditPopup();

//функция открытия попапов
export const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
};

//функция закрытия попапов
const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
};

//функция закрытия попапа на кнопку 'esc'
const closePopupByEsc = (evt) => {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
}

//закрытие попапа на overlay
popups.forEach(popup => {
    popup.addEventListener('click',(evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup(popup);
        }
    })
})

//закрытие попапов через "Х"
buttonsClosePopup.forEach((btn) => {
    const popup = btn.closest('.popup')
    btn.addEventListener('click', () => {
        closePopup(popup);
    })
});

//открытие попапа Edit и внесение текущих значений из профайла в инпуты
buttonOpenEditPopup.addEventListener('click', function () {
    const form = new FormValidator(validationConfig, formElementEdit);
    form.cleanValidationMessage();
    preloadEditPopup();

    form.enableValidation();
    form.enableSubmitButton();

    openPopup(popupEdit, form);
});

//закрытие попапа Edit через кнопку "Сохранить" и добавление новых значение в профайл
const handleFormSubmitEdit = (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup(popupEdit);
}
formElementEdit.addEventListener('submit', handleFormSubmitEdit);

// -----------------------------------------------------------------
// ДОБАВЛЕНИЕ КАРТОЧЕК
// -----------------------------------------------------------------
const initialCards = [
    {
        name: 'Морская черепаха',
        link: 'https://images.unsplash.com/photo-1662740600740-46d992377b1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80'
    },
    {
        name: 'Большая рыба',
        link: 'https://images.unsplash.com/photo-1618304448632-1ba36eea05b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1568&q=80'
    },
    {
        name: 'Скаты',
        link: 'https://images.unsplash.com/photo-1544552866-fef1d68c69b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
    },
    {
        name: 'Рыба-дракон',
        link: 'https://images.unsplash.com/photo-1567425928496-1ab66c650131?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1706&q=80'
    },
    {
        name: 'Нерпа',
        link: 'https://images.unsplash.com/photo-1519329475180-feddc4230aa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
    },
    {
        name: 'Акулы',
        link: 'https://images.unsplash.com/photo-1560275619-4cc5fa59d3ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1849&q=80'
    }
];
const elements = document.querySelector('.elements');
const titleInput = document.querySelector('.popup__input_value_title');
const linkInput = document.querySelector('.popup__input_value_link');

//добавление 6 карточек из массива на страницу
initialCards.forEach((item) => {
    const card = new Card(item, '#elements');
    const cardElement = card.generateCard();

    document.querySelector('.elements').append(cardElement);
})

//открытие попапа Add
buttonOpenAddPopup.addEventListener('click', function () {
    const form = new FormValidator(validationConfig, formElementAdd);

    form.cleanValidationMessage();
    formElementAdd.reset();

    form.enableValidation();
    form.disableSubmitButton();

    openPopup(popupAdd, form);
});

//закрытие попапа Add через кнопку "Создать" и добавление новой карточки в галерею
const handleFormSubmitAdd = (evt) => {
    evt.preventDefault();

    const newCard = {
        name: titleInput.value,
        link: linkInput.value
    }

    const card = new Card(newCard, '#elements');

    closePopup(popupAdd);

    elements.prepend(card.generateCard());
}
formElementAdd.addEventListener('submit', handleFormSubmitAdd);

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    disabledButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: '.popup__input-error'
}