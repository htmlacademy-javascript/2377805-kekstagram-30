import {createPhotoDescriptions} from './photo-description.js';

// Создание шаблона разметки изображения

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Поиск места в разметке для вставки миниатюр

const pictureList = document.querySelector('.pictures');

// Создание случайного массива из свойств для миниатюр

const thumbnails = createPhotoDescriptions();

// Создание фрагмента миниатюры

const thumbnailFragment = document.createDocumentFragment();

// Создание разметки для миниатюр из массива свойств миниатюр

thumbnails.forEach(({url, description, likes, comment}) => {
  const newThumbnail = thumbnailTemplate.cloneNode(true);
  newThumbnail.querySelector('.picture__img').src = url;
  newThumbnail.querySelector('.picture__img').alt = description;
  newThumbnail.querySelector('.picture__likes').textContent = likes;
  newThumbnail.querySelector('.picture__comments').textContent = comment.length;
  thumbnailFragment.appendChild(newThumbnail);
});

const createPictureList = () => pictureList.appendChild(thumbnailFragment);

createPictureList();
