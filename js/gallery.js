import {createRandomIdFromRangeGenerator} from './utils.js';
import {createDebouncedThumbnails} from './thumbnail.js';

const galleryFilters = document.querySelector('.img-filters');
const formButtons = document.querySelector('.img-filters__form');
const galleryButtons = document.querySelectorAll('.img-filters__button');

let pictures = [];

// Функция показа фильтров для галереи

const initGalleryFilters = (data) => {
  galleryFilters.classList.remove('img-filters--inactive');
  formButtons.addEventListener('click', handleButton);
  pictures = data.slice();
};

// Функция переключения активной кнопки

function handleButton (evt) {
  const currentButton = evt.target;
  galleryButtons.forEach((value) => {
    if (value.classList.contains('img-filters__button--active')) {
      value.classList.remove('img-filters__button--active');
    }
  });
  currentButton.classList.add('img-filters__button--active');
  if (currentButton['id'] === 'filter-default') {
    createDebouncedThumbnails(pictures);
  } else if (currentButton['id'] === 'filter-random') {
    createDebouncedThumbnails(createRandomPhotos(pictures));
  } else if (currentButton['id'] === 'filter-discussed') {
    createDebouncedThumbnails(createDiscussedPhotos(pictures));
  }
}

// Функция генерации рандомных фото

function createRandomPhotos (picturesData) {
  const updatePictures = [];
  const uniqId = createRandomIdFromRangeGenerator(0, picturesData.length - 1);
  for (let i = 0; i < 10; i++) {
    updatePictures.push(picturesData[uniqId()]);
  }
  return updatePictures;
};

// Функция сортировки от самых популярных к менее популярным

const sortDiscussedPhotos = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

function createDiscussedPhotos (picturesData) {
  const updatePictures = picturesData.slice();
  updatePictures.sort(sortDiscussedPhotos);
  return updatePictures;
};

export {initGalleryFilters};
