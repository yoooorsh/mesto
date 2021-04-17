//Функция показа ошибки на поле
function showInputError (formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

//Функция скрытия ошибки на поле
function hideInputError (formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

//Функция проверяет поля формы на валидность и возвращает ответ true/false
function hasInvalidInput(inputList) {
  return inputList.some(input => {
    return !input.validity.valid;
  });
};

//Функция проверки поля формы на валидность: если поле не валидно - отображаем ошибку, если валидно - скрываем
function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

//Функция переключает состояния кнопки в зависимости от валидности значений полей формы
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if(hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

//Функция успановки обработчика события input на поля полученной формы
function setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  //Выбираем все поля полученной формы
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  //Выбираем кнопку отправки полученной формы
  const buttonElement = formElement.querySelector(submitButtonSelector);
  //Если поля пустые, при открытии формы кнопка неактивна
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  //Для каждого поля формы устанавливаем обработчик события input: проверка на валидность и переключение активности кнопки
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

//Функция сбрасывает стандартное поведение отправки для форм 
//и запускает функцию установки обработчиков события input всем полям формы
function enableValidation(settingsObj) {
  //Выбираем все формы на документе
  const formList = Array.from(document.querySelectorAll(settingsObj.formSelector));
  //Для каждой формы
  formList.forEach((formElement) => {
    //сбрасываем стандартное поведение отправки формы
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    //получаем группы полей формы
    const fieldsetList = Array.from(formElement.querySelectorAll(settingsObj.fieldsetSelector));
    //устанавливаем каждой группе полей обработчик события input
    fieldsetList.forEach(fieldset => {
      setEventListeners(fieldset, settingsObj.inputSelector, settingsObj.submitButtonSelector, settingsObj.inactiveButtonClass, settingsObj.inputErrorClass, settingsObj.errorClass);
    });
  });
};

enableValidation(settingsElems);


