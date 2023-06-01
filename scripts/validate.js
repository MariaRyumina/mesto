const submitButtonChangeState = (form) => {
    const button = form.querySelector('.popup__button')
    if (!form.checkValidity()) {
        button.setAttribute('disabled', true);
        button.classList.add('popup__button_disable');
    } else {
        button.removeAttribute('disabled');
        button.classList.remove('popup__button_disable');
    }
}

const getErrorElement = (input) => {
    return document.querySelector(`#${input.id}-error`);
}

// Функция, которая добавляет класс с ошибкой
const showInputError = (input) => {
    const errorElement = getErrorElement(input);
    errorElement.textContent = input.validationMessage;
    input.classList.add('popup__input_type_error');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (input) => {
    const errorElement = getErrorElement(input);
    errorElement.textContent = '';
    input.classList.remove('popup__input_type_error');
};

// Функция, которая проверяет валидность поля
const validateInput = (input) => {
    if (!input.validity.valid) {
        showInputError(input);  // Если поле не проходит валидацию, покажем ошибку
    } else {
        hideInputError(input);  // Если проходит, скроем
    }
};

const sendForm = (evt) => {
    evt.preventDefault();
    const form = evt.target;
}

const validateInputEvent = (evt) => {
    const input = evt.target;
    const form = evt.currentTarget;
    validateInput(input);
    submitButtonChangeState(form);
};

document.querySelectorAll('.popup__form').forEach((formElement) => {
    formElement.addEventListener('input', validateInputEvent); // Вызовем функцию validateInputEvent на каждый ввод символа

    formElement.addEventListener('submit', sendForm);
    submitButtonChangeState(formElement);
})