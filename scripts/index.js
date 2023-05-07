let buttonOpenPopup = document.querySelector('.profile__button-edit');
let buttonClosePopup = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_value_name');
let aboutInput = document.querySelector('.popup__input_value_about');
let profileName = document.querySelector('.profile__title');
let profileAbout = document.querySelector('.profile__subtitle');

buttonOpenPopup.addEventListener('click', function () {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
});

function popupOpen () {
    popup.classList.remove('popup_opened');
}

buttonClosePopup.addEventListener('click', popupOpen);

function handleFormSubmit (evt) {
    evt.preventDefault();
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    popupOpen();
}

formElement.addEventListener('submit', handleFormSubmit);