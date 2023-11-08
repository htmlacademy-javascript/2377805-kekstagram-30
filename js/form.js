import {pictureList} from './thumbnail.js';
import {onFormValidate, resetFormValid, hashtagElements, commentElement} from './pristine.js';
import {onZoomChange, resetScale, fieldZoom} from './zoom.js';

const fieldUploadImages = pictureList.querySelector('.img-upload');
const imageUpload = fieldUploadImages.querySelector('.img-upload__input');
const fieldCreateDescription = pictureList.querySelector('.img-upload__overlay');
// const imagePreview = pictureList.querySelector('.img-upload__preview > img');
const buttonClose = pictureList.querySelector('.img-upload__cancel');
const imageEffects = pictureList.querySelector('.img-upload__effects');
const imageText = pictureList.querySelector('.img-upload__text');

// Обработчик изменения в поле инпута с загрузкой нового изображения

imageUpload.addEventListener('change', (evt) => {
  evt.preventDefault();
  fieldCreateDescription.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  buttonClose.addEventListener('click', onUploadModalClose, {once: true});
  hashtagElements.addEventListener('blur', onFormValidate);
  commentElement.addEventListener('blur', onFormValidate);
  fieldZoom.addEventListener('click', onZoomChange);
});

// Обработчик событий предотвращающий всплытие из заполняемых и меняемых полей

imageEffects.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

imageText.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

// Функция закрытия большого изображения

function onUploadModalClose () {
  imageUpload.value = '';
  fieldCreateDescription.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetFormValid();

  document.removeEventListener('keydown', onDocumentKeydown);
  hashtagElements.removeEventListener('blur', onFormValidate);
  commentElement.removeEventListener('blur', onFormValidate);
  fieldZoom.removeEventListener('click', onZoomChange);
  resetScale();
}

// Проверка если клавиша ESC нажата

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    buttonClose.click();
  }
}
