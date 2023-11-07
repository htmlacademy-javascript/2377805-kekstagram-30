import {pictureList} from './thumbnail.js';

const fieldZoom = document.querySelector('.img-upload__scale');
const btnBigger = fieldZoom.querySelector('.scale__control--bigger');
const btnSmaller = fieldZoom.querySelector('.scale__control--smaller');
const zoomPercent = fieldZoom.querySelector('.scale__control--value');
const imagePreview = pictureList.querySelector('.img-upload__preview > img');

let zoomValue = parseInt(zoomPercent.value.replace('%', ''), 10);

// Функция при нажатии на кнопки зума

const changeZoomValue = (evt) => {
  evt.preventDefault();
  if (evt.target === btnBigger) {
    if (zoomValue < 100) {
      zoomValue += 25;
    }
  } else if (evt.target === btnSmaller) {
    if (zoomValue > 0) {
      zoomValue -= 25;
    }
  }
  zoomPercent.value = `${zoomValue}%`;
  imagePreview.style.transform = `scale(${zoomValue / 100})`;
};

export {changeZoomValue, fieldZoom};
