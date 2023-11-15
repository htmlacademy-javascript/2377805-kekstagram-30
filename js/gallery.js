import {createRandomIdFromRangeGenerator} from './utils.js';

const galleryFilters = document.querySelector('.img-filters');
const formButtons = document.querySelector('.img-filters__form');
const galleryButtons = document.querySelectorAll('.img-filters__button');
const galleryButtonDefault = document.querySelector('#filter-default');
const galleryButtonRandom = document.querySelector('#filter-random');
const galleryButtonDiscussed = document.querySelector('#filter-discussed');

// Функция показа фильтров для галереи

const showGalleryFilters = () => {
  galleryFilters.classList.remove('img-filters--inactive');
};

// Функция переключения активной кнопки

const onActiveButton = (evt) => {
  galleryButtons.forEach((value) => {
    if (value.classList.contains('img-filters__button--active')) {
      value.classList.remove('img-filters__button--active');
    }
  });
  evt.target.classList.add('img-filters__button--active');
};

// Функция для фильтрации по дефолту

const setDefaultGalleryFilter = (callback) => {
  galleryButtonDefault.addEventListener('click', () => {
    callback();
  });
};

// Функция для фильтрации рандомно

const setRandomGalleryFilter = (callback) => {
  galleryButtonRandom.addEventListener('click', () => {
    callback();
  });
};

// Функция генерации рандомных фото

const createRandomPhotos = (pictures) => {
  const updatePictures = [];
  const uniqId = createRandomIdFromRangeGenerator(0, pictures.length - 1);
  for (let i = 0; i < 10; i++) {
    updatePictures.push(pictures[uniqId()]);
  }
  return updatePictures;
};

// Функция для фильтрации от самых популярных к менее популярным

const setDiscussedGalleryFilter = (callback) => {
  galleryButtonDiscussed.addEventListener('click', () => {
    callback();
  });
};

// Функция сортировки от самых популярных к менее популярным

const sortDiscussedPhotos = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const createDiscussedPhotos = (pictures) => {
  const updatePictures = pictures.slice();
  updatePictures.sort(sortDiscussedPhotos);
  return updatePictures;
};

// Добавление обработчика события нажатия на фильтр галереи

formButtons.addEventListener('click', onActiveButton);

export {showGalleryFilters, setDefaultGalleryFilter, setRandomGalleryFilter, setDiscussedGalleryFilter, createRandomPhotos, createDiscussedPhotos};
