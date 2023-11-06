import {pictureList} from './thumbnail.js';

const fieldUploadImages = pictureList.querySelector('.img-upload');
const imageUpload = fieldUploadImages.querySelector('.img-upload__input');
const fieldCreateDescription = pictureList.querySelector('.img-upload__overlay');
const imagePreview = pictureList.querySelector('.img-upload__preview > img');
const buttonClose = pictureList.querySelector('.img-upload__cancel');
const imageEffects = pictureList.querySelector('.img-upload__effects');
const imageText = pictureList.querySelector('.img-upload__text');

// Обработчик изменения в поле инпута с загрузкой нового изображения

imageUpload.addEventListener('change', (evt) => {
  evt.preventDefault();
  fieldCreateDescription.classList.remove('hidden');
  document.body.classList.add('modal-open');
  // imagePreview.src = imageUpload.value; // Что то не так с путем, может русские буквы не видит
  document.addEventListener('keydown', onDocumentKeydown);
  fieldUploadImages.addEventListener('click', onFreeZone);
  buttonClose.addEventListener('click', closeUploadModal, {once: true});
});

// Обработчик событий предотвращающий всплытие из заполняемых и меняемых полей

imageEffects.addEventListener('click', (evt) => {
  evt.stopPropagation();
});

imageText.addEventListener('click', (evt) => {
  evt.stopPropagation();
});

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

  document.removeEventListener('keydown', onDocumentKeydown);
  fieldUploadImages.removeEventListener('click', onFreeZone);
}

// Проверка если клавиша ESC нажата

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    buttonClose.click();
  }
}

// Проверка нажатия поля вне большого изображения

function onFreeZone (evt) {
  if (!evt.target.closest('.img-upload__preview-container') && !evt.target.closest('.img-upload__effects') && !evt.target.closest('.img-upload__text')) {
    evt.preventDefault();
    buttonClose.click();
  }
}
