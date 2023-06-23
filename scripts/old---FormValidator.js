class OldFormValidator {
    constructor(element, validationConfig) {
        this._element = element;
        this._validationConfig = validationConfig;
    }

    setEventListeners(){
        const inputList = Array.from(this._element.querySelectorAll(this._validationConfig.inputSelector));
        const buttonElement = this._element.querySelector(this._validationConfig.submitButtonSelector);
        toggleButtonState(inputList, buttonElement, this._validationConfig);

        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', function () {
                checkInputValidity(this._element, inputElement, this._validationConfig);
                toggleButtonState(inputList, buttonElement, this._validationConfig);
            });
        });
    }
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

// функция очищает интупы при закрытие без сохранения и удаляет ошибки валидации
function cleanValidationMessage(popup, validationConfig){
    const errors = popup.querySelectorAll(validationConfig.errorClass);
    const inputs= popup.querySelectorAll(validationConfig.inputSelector);
    errors.forEach((span) => {
        span.textContent = '';
    })

    inputs.forEach((input) => {
        input.classList.remove(validationConfig.inputErrorClass);
    })
}


export { OldFormValidator, cleanValidationMessage, disableSubmitButton, enableSubmitButton }