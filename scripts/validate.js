// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`); // Выбираем элемент ошибки (span) по его id
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add('popup__input_type_error');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove('popup__input_type_error');
};

// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement);  // Если поле не проходит валидацию, покажем ошибку
    } else {
        hideInputError(formElement, inputElement);  // Если проходит, скроем
    }
};

const hasValidityInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

// функция изменяет состояние кнопок 'сохранить' и 'добавить'
const toggleButtonState = (inputList, buttonElement) => {
    if (hasValidityInput(inputList)) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add('popup__button_disable');
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove('popup__button_disable');
    }
}

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};

enableValidation();






// const validateInput = (evt) => {
//     const inputElement = evt.target;
//     const formElement = evt.currentTarget;
//     checkInputValidity(formElement, inputElement);
//     changeStateSubmitButton(formElement);
// };
//
// document.querySelectorAll('.popup__form').forEach((formElement) => {
//     formElement.addEventListener('input', validateInput); // Вызовем функцию validateInputEvent на каждый ввод символа
//
//     formElement.addEventListener('submit', (evt) => {
//         evt.preventDefault();
//     });
//
//     changeStateSubmitButton(formElement);
// })