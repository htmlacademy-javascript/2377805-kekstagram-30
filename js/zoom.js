import {pictureList} from './thumbnail.js';

const MAX_ZOOM = 100;
const MIN_ZOOM = 25;
const ZOOM_STEP = 25;

const fieldZoom = document.querySelector('.img-upload__scale');
const btnBigger = fieldZoom.querySelector('.scale__control--bigger');
const btnSmaller = fieldZoom.querySelector('.scale__control--smaller');
const zoomPercent = fieldZoom.querySelector('.scale__control--value');
const imagePreview = pictureList.querySelector('.img-upload__preview > img');

let zoomValue = parseInt(zoomPercent.value.replace('%', ''), 10);

// Функция при нажатии на кнопки зума

const onZoomClick = (evt) => {
  evt.preventDefault();
  if (evt.target === btnBigger) {
    if (zoomValue < MAX_ZOOM) {
      zoomValue += ZOOM_STEP;
    }
  } else if (evt.target === btnSmaller) {
    if (zoomValue > MIN_ZOOM) {
      zoomValue -= ZOOM_STEP;
    }
  }
  zoomPercent.value = `${zoomValue}%`;
  imagePreview.style.transform = `scale(${zoomValue / 100})`;
};

// Функция сброса изменений зума

const resetScale = () => {
  imagePreview.style.transform = `scale(${MAX_ZOOM / 100})`;
  zoomPercent.value = `${MAX_ZOOM}%`;
  zoomValue = MAX_ZOOM;
};

export {onZoomClick, resetScale, fieldZoom};
