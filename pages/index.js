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
    profileName,
    profileAbout,
    validationConfig,
    initialCards,
    elements,
    titleInput,
    linkInput
} from "../utils/constants.js"
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";

const formValidatorEditPopup = new FormValidator(validationConfig, formElementEdit);
const formValidatorAddPopup = new FormValidator(validationConfig, formElementAdd);

const popupFormEdit = new PopupWithForm(popupEdit);
const popupFormAdd = new PopupWithForm(popupAdd);

const card = (initialCards, elements) => new Card(initialCards, elements);

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = card(item, '#elements').generateCard();
        cardList.addItem(cardElement);
    }
}, elements)
cardList.renderItems();


// прогрузка информации со странички в поля формы popupEdit
const preloadEditPopup = () => {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
}
preloadEditPopup();

//открытие попапа Edit и внесение текущих значений из профайла в инпуты
buttonOpenEditPopup.addEventListener('click', function () {
    formValidatorEditPopup.cleanValidationMessage();
    preloadEditPopup();

    formValidatorEditPopup.enableSubmitButton();

    popupFormEdit.open();
})

//закрытие попапа Edit через кнопку "Сохранить" и добавление новых значение в профайл
const handleFormSubmitEdit = (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    popupFormEdit.close();
}
formElementEdit.addEventListener('submit', handleFormSubmitEdit);

//открытие попапа Add
buttonOpenAddPopup.addEventListener('click', function () {
    formValidatorAddPopup.cleanValidationMessage();
    formElementAdd.reset();

    formValidatorAddPopup.disableSubmitButton();

    popupFormAdd.open();
});