// import {photoDescriptions} from './photo-description.js';
import {createThumbnails} from './thumbnail.js';
import './form.js';
import './modal.js';
import {getPicturesData} from './api.js';
import {showUploadErrorMessage, debounce} from './utils.js';
import {createSlider} from './range-effects.js';
import {showGalleryFilters, setDefaultGalleryFilter, setRandomGalleryFilter, setDiscussedGalleryFilter, createRandomPhotos, createDiscussedPhotos} from './gallery.js';

// createThumbnails(photoDescriptions); // Генерация картинок случайным образом

getPicturesData()
  .then((pictures) => {
    createThumbnails(pictures);
    showGalleryFilters();
    setDefaultGalleryFilter(debounce(
      () => createThumbnails(pictures), 500
    ));
    setRandomGalleryFilter(debounce(
      () => createThumbnails(createRandomPhotos(pictures)), 500
    ));
    setDiscussedGalleryFilter(debounce(
      () => createThumbnails(createDiscussedPhotos(pictures)), 500
    ));
  })
  .catch(() => {
    showUploadErrorMessage();
  });

createSlider();

// setUserFormSubmit(onUploadModalClose);
