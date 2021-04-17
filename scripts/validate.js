//Функция показа ошибки на поле
function showInputError (formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_show');
};

//Функция скрытия ошибки на поле
function hideInputError (formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_show');
  errorElement.textContent = '';
};

//Функция проверяет поля формы на валидность и возвращает ответ true/false
function hasInvalidInput(inputList) {
  return inputList.some(input => {
    return !input.validity.valid;
  });
};

//Функция проверки поля формы на валидность: если поле не валидно - отображаем ошибку, если валидно - скрываем
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//Функция переключает состояния кнопки в зависимости от валидности значений полей формы
function toggleButtonState(inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add('popup_save-button_disabled');
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove('popup_save-button_disabled');
  }
};

//Функция успановки обработчика события input на поля полученной формы
function setEventListeners(formElement) {
  //Выбираем все поля полученной формы
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  //Выбираем кнопку отправки полученной формы
  const buttonElement = formElement.querySelector('.popup__save-button');
  //Если поля пустые, при открытии формы кнопка неактивна
  toggleButtonState(inputList, buttonElement);
  //Для каждого поля формы устанавливаем обработчик события input: проверка на валидность и переключение активности кнопки
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//Функция сбрасывает стандартное поведение отправки для форм 
//и запускает функцию установки обработчиков события input всем полям формы
function enableValidation() {
  //Выбираем все формы на документе
  const formList = Array.from(document.querySelectorAll('.popup__container'));
  //Для каждой формы
  formList.forEach((formElement) => {
    //сбрасываем стандартное поведение отправки формы
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    //получаем группы полей формы
    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__fieldset'));
    //устанавливаем каждой группе полей обработчик события input
    fieldsetList.forEach(fieldset => {
      setEventListeners(fieldset);
    });
  });
};

enableValidation();


