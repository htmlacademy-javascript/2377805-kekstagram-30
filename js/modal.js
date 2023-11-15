import {pictureList} from './thumbnail.js';
import {onFormValidate, resetFormValid, hashtagElements, commentElement} from './pristine.js';
import {onZoomChange, resetScale, fieldZoom} from './zoom.js';
import {sliderElement, onUpdateSliderValue, effectsList, onEffectClick, changeEffectToDefault} from './range-effects.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fieldUploadImages = pictureList.querySelector('.img-upload');
const imageUpload = fieldUploadImages.querySelector('.img-upload__input');
const fieldCreateDescription = pictureList.querySelector('.img-upload__overlay');
const imagePreview = pictureList.querySelector('.img-upload__preview > img');
const buttonClose = pictureList.querySelector('.img-upload__cancel');
const imageText = pictureList.querySelector('.img-upload__text');

const imageForm = document.querySelector('.img-upload__form');

// Функция добавления изображения пользователя

const addPhoto = () => {
  const file = imageUpload.files[0];
  const fileName = file.name.toLowerCase();
  if (FILE_TYPES.some((value) => fileName.endsWith(value))) {
    imagePreview.src = URL.createObjectURL(file);
  }
};

// Обработчик изменения в поле инпута с загрузкой нового изображения

imageUpload.addEventListener('change', (evt) => {
  evt.preventDefault();
  addPhoto();

  fieldCreateDescription.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  buttonClose.addEventListener('click', onUploadModalClose);
  fieldZoom.addEventListener('click', onZoomChange);
  sliderElement.noUiSlider.on('update', onUpdateSliderValue); // Обработчик события изменения положения слайдера
  effectsList.addEventListener('click', onEffectClick);
  hashtagElements.addEventListener('blur', onFormValidate);
  commentElement.addEventListener('blur', onFormValidate);
});

// Обработчик событий предотвращающий всплытие из заполняемых и меняемых полей

imageText.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

// Функция закрытия формы для загрузки изображения

function onUploadModalClose () {
  imageUpload.value = '';
  fieldCreateDescription.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  buttonClose.removeEventListener('click', onUploadModalClose);
  fieldZoom.removeEventListener('click', onZoomChange);
  sliderElement.noUiSlider.off('update');
  effectsList.removeEventListener('click', onEffectClick);
  hashtagElements.removeEventListener('blur', onFormValidate);
  commentElement.removeEventListener('blur', onFormValidate);

  resetFormValid();
  imageForm.reset();
  resetScale();
  changeEffectToDefault();
}

// Проверка если клавиша ESC нажата

function onDocumentKeydown (evt) {
  const isErrorExist = Boolean(document.querySelector('.error'));
  if (evt.key === 'Escape' && !isErrorExist) {
    evt.preventDefault();
    onUploadModalClose();
  }
}

export {onUploadModalClose};
