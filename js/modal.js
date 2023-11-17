import {pictureList} from './thumbnail.js';
import {createSlider} from './range-effects.js';
import {addSubmitForm} from './form.js';
import {onFormFieldBlur, resetFormValid, hashtagElements, commentElement} from './pristine.js';
import {onZoomResize, resetScale, fieldZoom} from './zoom.js';
import {sliderElement, onSliderChange, effectsList, onEffectClick, changeEffectToDefault} from './range-effects.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fieldUploadImages = pictureList.querySelector('.img-upload');
const imageUpload = fieldUploadImages.querySelector('.img-upload__input');
const fieldCreateDescription = pictureList.querySelector('.img-upload__overlay');
const imagePreview = pictureList.querySelector('.img-upload__preview > img');
const effectsImages = pictureList.querySelectorAll('.effects__preview');
const buttonClose = pictureList.querySelector('.img-upload__cancel');
const imageText = pictureList.querySelector('.img-upload__text');

const imageForm = document.querySelector('.img-upload__form');

// Функция добавления изображения пользователя

const addPhoto = () => {
  const file = imageUpload.files[0];
  const fileName = file.name.toLowerCase();
  if (FILE_TYPES.some((value) => fileName.endsWith(value))) {
    imagePreview.src = URL.createObjectURL(file);
    effectsImages.forEach((effect) => {
      effect.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }
};

// Обработчик изменения в поле инпута с загрузкой нового изображения

const initModal = () => {
  imageUpload.addEventListener('change', (evt) => {
    evt.preventDefault();
    addPhoto();

    fieldCreateDescription.classList.remove('hidden');
    document.body.classList.add('modal-open');

    document.addEventListener('keydown', onDocumentKeydown);
    buttonClose.addEventListener('click', onModalClose);
    fieldZoom.addEventListener('click', onZoomResize);
    sliderElement.noUiSlider.on('update', onSliderChange); // Обработчик события изменения положения слайдера
    effectsList.addEventListener('click', onEffectClick);
    hashtagElements.addEventListener('blur', onFormFieldBlur);
    commentElement.addEventListener('blur', onFormFieldBlur);
  });
  createSlider();
  addSubmitForm();
};


// Обработчик событий предотвращающий всплытие из заполняемых и меняемых полей

imageText.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

// Функция закрытия формы для загрузки изображения

function onModalClose () {
  imageUpload.value = '';
  fieldCreateDescription.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  buttonClose.removeEventListener('click', onModalClose);
  fieldZoom.removeEventListener('click', onZoomResize);
  sliderElement.noUiSlider.off('update');
  effectsList.removeEventListener('click', onEffectClick);
  hashtagElements.removeEventListener('blur', onFormFieldBlur);
  commentElement.removeEventListener('blur', onFormFieldBlur);

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
    onModalClose();
  }
}

export {onModalClose, initModal};
