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

//функция открытия попапов
const openPopup = (popup) => {
    popup.classList.add('popup_opened');
};

//функция закрытие попапов
const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
};

//закрытие попапов через "Х"
buttonsClosePopup.forEach((btn) => {
    const popup = btn.closest('.popup')
    btn.addEventListener('click', () => closePopup(popup));
});

//открытие попапа Edit и внесение текущих значений из профайла в инпуты
buttonOpenEditPopup.addEventListener('click', function () {
    openPopup(popupEdit);
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
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
const templateElements = document.querySelector('#elements').content;
const image = document.querySelector('.popup__img');
const imageCaption = document.querySelector('.popup__img-caption');
const popupImage = document.querySelector('.popup_content_image');
const titleInput = document.querySelector('.popup__input_value_title');
const linkInput = document.querySelector('.popup__input_value_link');
const elementsImage = document.querySelectorAll('.element__img');

//лайк карточке
const buttonLike = (evt) => {
    const like = evt.target.closest('.element__like')
    like.classList.toggle('element__like_active');
}

//удаление карточки
const deleteCard = (evt) => {
    const card = evt.target.closest('.element');
    card.remove();
}

//добавление 6 карточек на страницу
const createCard = (el) => {
    const card = templateElements.querySelector('.element').cloneNode(true);
    card.querySelector('.element__img').src = el.link;
    card.querySelector('.element__title').textContent = el.name;
    card.querySelector('.element__img').alt = el.name;
    elements.append(card);
    card.querySelector('.element__like').addEventListener('click', buttonLike);
    card.querySelector('.element__delete').addEventListener('click', deleteCard);

    card.querySelector('.element__img').addEventListener('click', () => {
        image.src = el.link;
        image.alt = el.name;
        imageCaption.textContent = el.name;
        openPopup(popupImage);
    });
}
initialCards.forEach((item) => {
    createCard(item);
});

//открытие попапа Add
buttonOpenAddPopup.addEventListener('click', function () {
    openPopup(popupAdd);
});

//закрытие попапа Add через кнопку "Создать" и добавление новой карточки в галерею
const handleFormSubmitAdd = (evt) => {
    evt.preventDefault();
    const card = templateElements.querySelector('.element').cloneNode(true);
    card.querySelector('.element__img').src = linkInput.value;
    card.querySelector('.element__title').textContent = titleInput.value;
    card.querySelector('.element__img').setAttribute('alt', titleInput.value);
    card.querySelector('.element__like').addEventListener('click', buttonLike);
    card.querySelector('.element__delete').addEventListener('click', deleteCard);
    card.querySelector('.element__img').addEventListener('click', () => {
        image.src = card.querySelector('.element__img').src;
        image.alt = card.querySelector('.element__title').textContent;
        imageCaption.textContent = card.querySelector('.element__title').textContent;
        openPopup(popupImage);
    });
    closePopup(popupAdd);
    elements.prepend(card);
    formElementAdd.reset();
}
formElementAdd.addEventListener('submit', handleFormSubmitAdd);