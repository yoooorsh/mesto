export class FormValidator {
    constructor(settingsObj, form) {
        this._settingsObj = settingsObj;
        this._form = form;
        //Кнопка отправки полученной формы
        this._buttonElement = this._getSubmitBtn();
        //Группы полей формы
        this._fieldsetList = this._getFieldsetList();
    }

    //Функция показа ошибки на поле
    _showInputError (formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._settingsObj.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settingsObj.errorClass);
    }
  
    //Функция скрытия ошибки на поле
    _hideInputError (formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._settingsObj.inputErrorClass);
        errorElement.classList.remove(this._settingsObj.errorClass);
        errorElement.textContent = '';
    }
  
    //Функция проверяет поля формы на валидность и возвращает ответ true/false
    _hasInvalidInput(inputList) {
        return inputList.some(input => {
            return !input.validity.valid;
        });
    }
  
    //Функция проверки поля формы на валидность: если поле не валидно - отображаем ошибку, если валидно - скрываем
    _checkInputValidity(formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement);
        }
    }
  
    //Функция переключает состояния кнопки в зависимости от валидности значений полей формы
    _toggleButtonState(inputList) {
        if(this._hasInvalidInput(inputList)) {
            this._buttonElement.setAttribute('disabled', true);
            this._buttonElement.classList.add(this._settingsObj.inactiveButtonClass);
        } else {
            this._buttonElement.removeAttribute('disabled');
            this._buttonElement.classList.remove(this._settingsObj.inactiveButtonClass);
        }
    }
  
    //Функция успановки обработчика события input на поля полученной формы
    _setEventListeners(formElement) {
        //Выбираем все поля полученной формы
        const inputList = Array.from(formElement.querySelectorAll(this._settingsObj.inputSelector));
        //Если поля пустые, при открытии формы кнопка неактивна
        this._toggleButtonState(inputList);
        //Для каждого поля формы устанавливаем обработчик события input: проверка на валидность и переключение активности кнопки
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement);
                this._toggleButtonState(inputList);
            });
        });
    }

    //Функция сбрасывает стандартное поведение отправки для формы, полученной в параметре, 
    //и запускает функцию установки обработчиков события input всем полям формы
    enableValidation() {
        //На кнопку открытия окна вешаем событие по клику, которое очистит форму от ошибок
        const openBtn = document.querySelector(this._settingsObj.openFormBtnSelector);
        openBtn.addEventListener('click', () => {
            this._resetError();
        });

        //Сбрасываем стандартное поведение отправки формы
        this._form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        //устанавливаем каждой группе полей обработчик события input
        this._fieldsetList.forEach(fieldset => {
            this._setEventListeners(fieldset);
        });
    }

    //Функция получения массива групп полей формы
    _getFieldsetList() {
        const fieldsetList = Array.from(this._form.querySelectorAll(this._settingsObj.fieldsetSelector));
        return fieldsetList;
    }

    //Функция получения кнопки отправки формы
    _getSubmitBtn() {
        const buttonElement = this._form.querySelector(this._settingsObj.submitButtonSelector);
        return buttonElement;
    }

    //Функция сброса состояния ошибки с полей формы
    _resetError() {
        this._fieldsetList.forEach(fieldset => {
            const inputList = Array.from(fieldset.querySelectorAll(this._settingsObj.inputSelector));
            this._toggleButtonState(inputList);
            inputList.forEach(inputElement => {
                this._hideInputError(fieldset, inputElement);
            });
        });
    }
}

