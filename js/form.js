import {pictureList} from './thumbnail.js';
import {isFormValid, resetFormValid, hashtagElements, commentElement} from './pristine.js';
import {changeZoomValue, fieldZoom} from './zoom.js';

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
  buttonClose.addEventListener('click', closeUploadModal, {once: true});
  hashtagElements.addEventListener('blur', isFormValid);
  commentElement.addEventListener('blur', isFormValid);
  fieldZoom.addEventListener('click', changeZoomValue);
});

// Обработчик событий предотвращающий всплытие из заполняемых и меняемых полей

imageEffects.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

imageText.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

// Функция закрытия большого изображения

function closeUploadModal () {
  imageUpload.value = '';
  fieldCreateDescription.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetFormValid();

  document.removeEventListener('keydown', onDocumentKeydown);
  hashtagElements.removeEventListener('blur', isFormValid);
  commentElement.removeEventListener('blur', isFormValid);
  fieldZoom.removeEventListener('click', changeZoomValue);
}

// Проверка если клавиша ESC нажата

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    buttonClose.click();
  }
}
