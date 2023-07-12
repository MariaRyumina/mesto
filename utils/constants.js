export const formElementEdit = document.querySelector('.popup__form_edit');
export const formElementAdd = document.querySelector('.popup__form_add');
export const buttonOpenEditPopup = document.querySelector('.profile__button-edit');
export const buttonOpenAddPopup = document.querySelector('.profile__button-add');
export const popupEdit = document.querySelector('.popup_content_edit');
export const popupAdd = document.querySelector('.popup_content_add');
export const popupImage = document.querySelector('.popup_content_image');
export const nameInput = document.querySelector('.popup__input_value_name');
export const aboutInput = document.querySelector('.popup__input_value_about');
export const profileName = document.querySelector('.profile__title');
export const profileAbout = document.querySelector('.profile__subtitle');
export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    disabledButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: '.popup__input-error'
}
export const initialCards = [
    {
        title: 'Акулы',
        link: 'https://images.unsplash.com/photo-1560275619-4cc5fa59d3ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1849&q=80'
    },
    {
        title: 'Нерпа',
        link: 'https://images.unsplash.com/photo-1519329475180-feddc4230aa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
    },
    {
        title: 'Рыба-дракон',
        link: 'https://images.unsplash.com/photo-1567425928496-1ab66c650131?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1706&q=80'
    },
    {
        title: 'Скаты',
        link: 'https://images.unsplash.com/photo-1544552866-fef1d68c69b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
    },
    {
        title: 'Большая рыба',
        link: 'https://images.unsplash.com/photo-1618304448632-1ba36eea05b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1568&q=80'
    },
    {
        title: 'Морская черепаха',
        link: 'https://images.unsplash.com/photo-1662740600740-46d992377b1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80'
    }
];
export const elements = document.querySelector('.elements');
export const titleInput = document.querySelector('.popup__input_value_title');
export const linkInput = document.querySelector('.popup__input_value_link');
export const image = document.querySelector('.popup__img');
export const imageCaption = document.querySelector('.popup__img-caption');
