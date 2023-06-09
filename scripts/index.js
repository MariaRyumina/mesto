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
const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
};

//функция закрытие попапов
const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
    formElementAdd.reset();
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
    cleanValidationMessage(popupEdit);
    preloadEditPopup();
    enableSubmitButton();
    openPopup(popupEdit);
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
const elements = document.querySelector('.elements');
const templateElements = document.querySelector('#elements').content;
const image = document.querySelector('.popup__img');
const imageCaption = document.querySelector('.popup__img-caption');
const popupImage = document.querySelector('.popup_content_image');
const titleInput = document.querySelector('.popup__input_value_title');
const linkInput = document.querySelector('.popup__input_value_link');

//лайк карточке
const likeButton = (evt) => {
    const like = evt.target.closest('.element__like')
    like.classList.toggle('element__like_active');
}

//удаление карточки
const deleteCard = (evt) => {
    const card = evt.target.closest('.element');
    card.remove();
}

//функция добавления карточки
const createNewCard = (el) => {
    const card = templateElements.querySelector('.element').cloneNode(true);
    card.querySelector('.element__title').textContent = el.name;
    card.querySelector('.element__img').alt = el.name;
    card.querySelector('.element__img').src = el.link;

    card.querySelector('.element__like').addEventListener('click', likeButton);
    card.querySelector('.element__delete').addEventListener('click', deleteCard);
    card.querySelector('.element__img').addEventListener('click', () => {
        image.src = el.link;
        image.alt = el.name;
        imageCaption.textContent = el.name;
        openPopup(popupImage);
    });
    return card;
}

//добавление 6 карточек из массива на страницу
initialCards.forEach((item) => {
    const card = createNewCard(item);
    elements.append(card);
});

//открытие попапа Add
buttonOpenAddPopup.addEventListener('click', function () {
    cleanValidationMessage(popupAdd);
    disableSubmitButton();
    openPopup(popupAdd);
});

//закрытие попапа Add через кнопку "Создать" и добавление новой карточки в галерею
const handleFormSubmitAdd = (evt) => {
    evt.preventDefault();

    const newCard = {
        name: titleInput.value,
        link: linkInput.value
    }
    const card = createNewCard(newCard);

    closePopup(popupAdd);

    elements.prepend(card);

    disableSubmitButton();
}
formElementAdd.addEventListener('submit', handleFormSubmitAdd);