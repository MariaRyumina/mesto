let formElement = document.querySelector('.popup__form');
let buttonOpenEditPopup = document.querySelector('.profile__button-edit');
let buttonOpenAddPopup = document.querySelector('.profile__button-add');
let popupEdit = document.querySelector('.popup_edit');
let popupAdd = document.querySelector('.popup_add');
let nameInput = document.querySelector('.popup__input_value_name');
let aboutInput = document.querySelector('.popup__input_value_about');
let profileName = document.querySelector('.profile__title');
let profileAbout = document.querySelector('.profile__subtitle');
let buttonClosePopup = document.querySelector('.popup__close');

buttonOpenEditPopup.addEventListener('click', function () {
    popupEdit.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
});

function closeEditPopup () {
    popupEdit.classList.remove('popup_opened');
}

buttonClosePopup.addEventListener('click', closeEditPopup);

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closeEditPopup();
}

formElement.addEventListener('submit', handleFormSubmit);

buttonOpenAddPopup.addEventListener('click', function () {
    popupAdd.classList.add('popup_opened');
});

