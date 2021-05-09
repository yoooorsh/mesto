export class FormValidator {
    constructor(settingsObj, form) {
        this._settingsObj = settingsObj;
        this._form = form;
    }

    //Функция показа ошибки на поле
    _showInputError (formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(errorClass);
    };
  
    //Функция скрытия ошибки на поле
    _hideInputError (formElement, inputElement, inputErrorClass, errorClass) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorClass);
        errorElement.textContent = '';
    };
  
    //Функция проверяет поля формы на валидность и возвращает ответ true/false
    _hasInvalidInput(inputList) {
        return inputList.some(input => {
        return !input.validity.valid;
        });
    };
  
    //Функция проверки поля формы на валидность: если поле не валидно - отображаем ошибку, если валидно - скрываем
    _checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
        if (!inputElement.validity.valid) {
        _showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
        } else {
        _hideInputError(formElement, inputElement, inputErrorClass, errorClass);
        }
    };
  
    //Функция переключает состояния кнопки в зависимости от валидности значений полей формы
    _toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
        if(_hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(inactiveButtonClass);
        } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(inactiveButtonClass);
        }
    };
  
    //Функция успановки обработчика события input на поля полученной формы
    _setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
        //Выбираем все поля полученной формы
        const inputList = Array.from(formElement.querySelectorAll(inputSelector));
        //Выбираем кнопку отправки полученной формы
        const buttonElement = formElement.querySelector(submitButtonSelector);
        //Если поля пустые, при открытии формы кнопка неактивна
        _toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        //Для каждого поля формы устанавливаем обработчик события input: проверка на валидность и переключение активности кнопки
        inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            _checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
            _toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
        });
    };

    //Функция сбрасывает стандартное поведение отправки для формы, полученной в параметре, 
    //и запускает функцию установки обработчиков события input всем полям формы
    enableValidation() {
        //Сбрасываем стандартное поведение отправки формы
        form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        //получаем группы полей формы
        const fieldsetList = Array.from(form.querySelectorAll(this._settingsObj.fieldsetSelector));
        //устанавливаем каждой группе полей обработчик события input
        fieldsetList.forEach(fieldset => {
            _setEventListeners(fieldset, this._settingsObj.inputSelector, this._settingsObj.submitButtonSelector, this._settingsObj.inactiveButtonClass, this._settingsObj.inputErrorClass, this._settingsObj.errorClass);
        });
    };
}

