// функция очищает интупы при закрытие без сохранения и удаляет ошибки валидации
const cleanValidationMessage = (popup, validationConfig) => {
    const errors = popup.querySelectorAll(validationConfig.errorClass);
    const inputs= popup.querySelectorAll(validationConfig.inputSelector);
    errors.forEach((span) => {
        span.textContent = '';
    })

    inputs.forEach((input) => {
        input.classList.remove(validationConfig.inputErrorClass);
    })
}

// функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`); // Выбираем элемент ошибки (span) по его id
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(validationConfig.inputErrorClass);
};

// функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(validationConfig.inputErrorClass);
};

// функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement, validationConfig) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, validationConfig);  // Если поле не проходит валидацию, покажем ошибку
    } else {
        hideInputError(formElement, inputElement, validationConfig);  // Если проходит, скроем
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

// функция, которая делает кнопку неактивной
const disableSubmitButton = (buttonElement, validationConfig) => {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(validationConfig.disabledButtonClass);
}

// функция, которая делает кнопку активной
const enableSubmitButton = (buttonElement, validationConfig) => {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(validationConfig.disabledButtonClass);
}

// функция изменяет состояние кнопок 'сохранить' и 'добавить'
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if (hasInvalidInput(inputList)) {
        disableSubmitButton(buttonElement, validationConfig);
    } else {
        enableSubmitButton(buttonElement, validationConfig);
    }
}

const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationConfig);

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, validationConfig);
            toggleButtonState(inputList, buttonElement, validationConfig);
        });
    });
};

const enableValidation = (validationConfig) => {
    const formList = document.querySelectorAll(validationConfig.formSelector);
    formList.forEach((formElement) => {
        setEventListeners(formElement, validationConfig);
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
    });
};

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    disabledButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: '.popup__input-error'
};

enableValidation(validationConfig);