// Создание шаблона разметки изображения

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Поиск места в разметке для вставки миниатюр

const pictureList = document.querySelector('.pictures');

// Создание фрагмента миниатюры

const thumbnailFragment = document.createDocumentFragment();

// Функция создания разметки миниатюры

const createThumbnail = ({url, description, likes, comment}) => {
  const newThumbnail = thumbnailTemplate.cloneNode(true);
  newThumbnail.querySelector('.picture__img').src = url;
  newThumbnail.querySelector('.picture__img').alt = description;
  newThumbnail.querySelector('.picture__likes').textContent = likes;
  newThumbnail.querySelector('.picture__comments').textContent = comment.length;
  return newThumbnail;
};

// Функция создания блока миниатюр и добавление в список

const createThumbnails = (descriptions) => {
  descriptions.forEach((description) => {
    const newThumbnail = createThumbnail(description);
    thumbnailFragment.appendChild(newThumbnail);
  });
  pictureList.appendChild(thumbnailFragment);
};

export {createThumbnails};