import {pristine} from './pristine.js';
import {sendFormData} from './api.js';
import {onUploadModalClose} from './modal.js';


const imageForm = document.querySelector('.img-upload__form');

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const buttonSubmit = imageForm.querySelector('.img-upload__submit');
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...',
};

// Функция при отправке формы

const sendForm = async (formElement) => {
  if (!pristine.validate()) {
    return;
  }

  try {
    blockSubmitButton();
    await sendFormData(new FormData(formElement));
    onUploadModalClose();
    unblockSubmitButton();
    showSuccess();
  } catch {
    unblockSubmitButton();
    showError();
  }
};

// Функция обработчик события отправки формы

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendForm(evt.target);
};

// Обработчик события отправки формы

imageForm.addEventListener('submit', onFormSubmit);

// const setUserFormSubmit = (onSuccess) => {
//   imageForm.addEventListener('submit', (evt) => {
//     evt.preventDefault();

//     const isValid = pristine.validate();
//     if (isValid) {
//       blockSubmitButton();
//       const formData = new FormData(evt.target);
//       sendFormData(formData)
//         .then(() => {
//           onSuccess();
//           showSuccess();
//         })
//         .catch(() => {
//           showAlert();
//         })
//         .finally(unblockSubmitButton);
//     }
//   });
// };

// Функция показа успешного сообщения

function showSuccess () {
  showMessage(successMessageTemplate, '.success__button');
}

// Функция показа сообщения с ошибкой

function showError () {
  showMessage(errorMessageTemplate, '.error__button');
}

// Функция показа сообщения

function showMessage (element, buttonClass) {
  document.body.append(element);
  element.querySelector(buttonClass).addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydownMessage);
  document.body.addEventListener('click', onFreeZoneOfMessage);
}

// Функция скрытия сообщения

function closeMessage () {
  const existsElement = document.querySelector('.success') || document.querySelector('.error');
  existsElement.remove();
  document.removeEventListener('keydown', onDocumentKeydownMessage);
  document.body.removeEventListener('click', onFreeZoneOfMessage);
}

// Проверка, что нажата кнопка закрыть сообщения

function onCloseButtonClick () {
  closeMessage();
}

// Проверка, нажатия произвольной области вне сообщения об успешной загрузке фотографии  или сообщения об ошибке

function onFreeZoneOfMessage (evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  closeMessage();
}

// Проверка, нажатия кнопки эскейп при открытом сообщении об ошибке

function onDocumentKeydownMessage (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeMessage();
  }
}

// Блокировка кнопки отправить при публикации

function blockSubmitButton () {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = SubmitButtonText.SENDING;
}

// Разблокировка кнопки отправить

function unblockSubmitButton () {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = SubmitButtonText.IDLE;
}

// export {setUserFormSubmit};
