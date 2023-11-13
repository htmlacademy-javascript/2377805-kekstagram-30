// import {photoDescriptions} from './photo-description.js';
import {createThumbnails} from './thumbnail.js';
import './form.js';
import './modal.js';
import {getPicturesData} from './api.js';
import {showUploadErrorMessage} from './utils.js';
import {createSlider} from './range-effects.js';

// createThumbnails(photoDescriptions); // Генерация картинок случайным образом

getPicturesData()
  .then((pictures) => {
    createThumbnails(pictures);
  })
  .catch(() => {
    showUploadErrorMessage();
  });

createSlider();

// setUserFormSubmit(onUploadModalClose);
