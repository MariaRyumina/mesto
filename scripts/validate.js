// функция очищает интупы при закрытие без сохранения и удаляет ошибки валидации
const cleanValidationMessage = (popup) => {
    const errors = popup.querySelectorAll(validationConfig.errorClass);
    const inputs= popup.querySelectorAll(validationConfig.inputElement);

    errors.forEach((span) => {
        span.textContent = '';
    })

    inputs.forEach((input) => {
        input.classList.remove(validationConfig.inputErrorClass);
        input.value = '';
    })
}

// функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`); // Выбираем элемент ошибки (span) по его id
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(validationConfig.inputErrorClass);
};

// функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(validationConfig.inputErrorClass);
};

// функция, которая проверяет валидность поля
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
        buttonElement.classList.add(validationConfig.disabledButtonClass);
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(validationConfig.disabledButtonClass);
    }
}

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputElement));
    const buttonElement = formElement.querySelector(validationConfig.buttonElement);
    toggleButtonState(inputList, buttonElement);

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formElement));
    formList.forEach((formElement) => {
        setEventListeners(formElement);
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

    });
};

const validationConfig = {
    formElement: '.popup__form',
    inputElement: '.popup__input',
    buttonElement: '.popup__button',
    disabledButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: '.popup__input-error'
};

enableValidation();