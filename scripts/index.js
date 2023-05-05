let buttonOpenPopup = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup');
let buttonClosePopup = document.querySelector('.popup__close');
let buttonSavePopup = document.querySelector('.popup__button');

buttonOpenPopup.addEventListener('click', function  () {
    popup.classList.add('popup__opened');
});

buttonClosePopup.addEventListener('click', function  () {
    popup.classList.remove('popup__opened');
});