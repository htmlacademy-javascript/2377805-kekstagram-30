import {openBigPicture} from './full-picture.js';
import {debounce} from './utils.js';

// Создание шаблона разметки изображения

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Поиск места в разметке для вставки миниатюр

const pictureList = document.querySelector('.pictures');

// Создание фрагмента миниатюры

const thumbnailFragment = document.createDocumentFragment();

// Функция создания разметки миниатюры

const createThumbnail = ({url, description, likes, comments}) => {
  const newThumbnail = thumbnailTemplate.cloneNode(true);
  newThumbnail.querySelector('.picture__img').src = url;
  newThumbnail.querySelector('.picture__img').alt = description;
  newThumbnail.querySelector('.picture__likes').textContent = likes;
  newThumbnail.querySelector('.picture__comments').textContent = comments.length;
  return newThumbnail;
};

// Функция удаления блока миниатюр

const clearThumbnails = () => {
  pictureList.querySelectorAll('.picture').forEach((thumbnail) => thumbnail.remove());
};

// Функция создания блока миниатюр и добавление в список

const createThumbnails = (descriptions) => {
  clearThumbnails();
  descriptions.forEach((description) => {
    const newThumbnail = createThumbnail(description);
    thumbnailFragment.appendChild(newThumbnail);
    newThumbnail.addEventListener('click', (e) => {
      e.preventDefault();
      openBigPicture(description);
    });
  });
  pictureList.appendChild(thumbnailFragment);
};

// Функция создания блока миниатюр с debounce

const createDebouncedThumbnails = debounce(createThumbnails,500);

export {createThumbnails, pictureList, createDebouncedThumbnails};
