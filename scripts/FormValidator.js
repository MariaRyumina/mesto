export class FormValidator {
    constructor(validationConfig, formElement) {
        this._validationConfig = validationConfig;
        this._formElement = formElement;
        this._errorClass = formElement.querySelectorAll(validationConfig.errorClass);
        this._inputErrorClass = validationConfig.inputErrorClass;
        this._inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
        this._buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
        this._enableValidation();
    }

    // очищаем интупы при закрытии без сохранения и удаляем ошибки валидации
    cleanValidationMessage () {
        this._errorClass.forEach((span) => {
            span.textContent = '';
        })

        this._inputList.forEach((input) => {
            input.classList.remove(this._inputErrorClass);
        })
    }

    // добавляем класс с ошибкой
    _showInputError (inputElement) {
        this._formElement.querySelector(`#${inputElement.id}-error`).textContent = inputElement.validationMessage;
        inputElement.classList.add(this._inputErrorClass);
    }

    // удаляем класс с ошибкой
    _hideInputError (inputElement) {
        this._formElement.querySelector(`#${inputElement.id}-error`).textContent = '';
        inputElement.classList.remove(this._inputErrorClass);
    }

    // проверяем валидность поля
    _checkInputValidity (inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);  // Если поле не проходит валидацию, покажем ошибку
        } else {
            this._hideInputError(inputElement);  // Если проходит, скроем
        }
    }

    _hasInvalidInput () {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    // делаем кнопку неактивной
    disableSubmitButton () {
        this._buttonElement.setAttribute('disabled', true);
        this._buttonElement.classList.add(this._validationConfig.disabledButtonClass);
    }

    // делаем кнопку активной
    enableSubmitButton () {
        this._buttonElement.removeAttribute('disabled');
        this._buttonElement.classList.remove(this._validationConfig.disabledButtonClass);
    }

    // изменяем состояние кнопок 'сохранить' и 'добавить'
    _toggleButtonState () {
        if (this._hasInvalidInput()) {
            this.disableSubmitButton();
        } else {
            this.enableSubmitButton();
        }
    }

    _setEventListeners () {
        this._toggleButtonState();

        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    _enableValidation () {
        this._setEventListeners();
        this._formElement.addEventListener('submit', function (evt) {
                evt.preventDefault();
        });
    }
}