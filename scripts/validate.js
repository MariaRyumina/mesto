// функция очищает интупы при закрытие без сохранения и удаляет ошибки валидации
const cleanValidationMessage = (popup) => {
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
const showInputError = (formSelector, inputSelector) => {
    const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`); // Выбираем элемент ошибки (span) по его id
    errorElement.textContent = inputSelector.validationMessage;
    inputSelector.classList.add(validationConfig.inputErrorClass);
};

// функция, которая удаляет класс с ошибкой
const hideInputError = (formSelector, inputSelector) => {
    const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`);
    errorElement.textContent = '';
    inputSelector.classList.remove(validationConfig.inputErrorClass);
};

// функция, которая проверяет валидность поля
const checkInputValidity = (formSelector, inputSelector) => {
    if (!inputSelector.validity.valid) {
        showInputError(formSelector, inputSelector);  // Если поле не проходит валидацию, покажем ошибку
    } else {
        hideInputError(formSelector, inputSelector);  // Если проходит, скроем
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputSelector) => {
        return !inputSelector.validity.valid;
    })
}

// функция, которая делает кнопку неактивной
const disableSubmitButton = () => {
    const submitButton = document.querySelectorAll(validationConfig.submitButtonSelector);
    submitButton.forEach((btn) => {
        btn.setAttribute('disabled', true);
        btn.classList.add(validationConfig.disabledButtonClass);
    })
}

// функция, которая делает кнопку активной
const enableSubmitButton = () => {
    const submitButton = document.querySelectorAll(validationConfig.submitButtonSelector);
    submitButton.forEach((btn) => {
        btn.removeAttribute('disabled');
        btn.classList.remove(validationConfig.disabledButtonClass);
    })
}

// функция изменяет состояние кнопок 'сохранить' и 'добавить'
const toggleButtonState = (inputList, submitButtonSelector) => {
    if (hasInvalidInput(inputList)) {
        disableSubmitButton(submitButtonSelector);
    } else {
        enableSubmitButton(submitButtonSelector)
    }
}

const setEventListeners = (formSelector, validationConfig) => {
    const inputList = Array.from(formSelector.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formSelector.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);

    inputList.forEach(inputSelector => {
        inputSelector.addEventListener('input', function () {
            checkInputValidity(formSelector, inputSelector);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = (validationConfig) => {
    const formList = document.querySelectorAll(validationConfig.formSelector);
    formList.forEach((formSelector) => {
        setEventListeners(formSelector, validationConfig);
        formSelector.addEventListener('submit', function (evt) {
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