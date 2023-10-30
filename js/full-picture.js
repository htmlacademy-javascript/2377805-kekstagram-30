const bigPicture = document.querySelector('.big-picture'); // Блок большого изображения (ББИ)
const bigPictureImg = document.querySelector('.big-picture__img > img'); // Фото в ББИ
const likesCounter = bigPicture.querySelector('.likes-count'); // Счетчик лайков
const photoCaption = bigPicture.querySelector('.social__caption'); // Описание фотографии
const showedComments = bigPicture.querySelector('.social__comment-shown-count'); // Счетчик показанных комментариев

const totalComments = bigPicture.querySelector('.social__comment-total-count'); // Счетчик всего комментариев
const commentsList = bigPicture.querySelector('.social__comments'); // Блок комментариев
const commentTemplate = commentsList.querySelector('.social__comment'); // Шаблон комментария
const buttonClose = bigPicture.querySelector('.big-picture__cancel'); // Кнопка закрыть

// Создание списка комментариев

const createCommentsList = (comments) => {
  comments.forEach (({avatar, name, message}) => {
    const newComment = commentTemplate.cloneNode(true);
    newComment.querySelector('.social__picture').src = avatar;
    newComment.querySelector('.social__picture').alt = name;
    newComment.querySelector('.social__text').textContent = message;
    commentsList.append(newComment);
  });
};

// Функция при открытии большого изображения

const openBigPicture = (miniphoto) => {
  commentsList.innerHTML = '';
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureImg.src = miniphoto.url;
  likesCounter.textContent = miniphoto.likes;
  showedComments.textContent = 5;
  totalComments.textContent = miniphoto.comments.length;
  photoCaption.textContent = miniphoto.description;
  createCommentsList(miniphoto.comments);

  document.addEventListener('keydown', onDocumentKeydown);

  // Для будущих разделов это удалить
  // bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  // bigPicture.querySelector('.comments-loader').classList.add('hidden');
};

// Функция закрытия большого изображения

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsList.innerHTML = '';

  document.removeEventListener('keydown', onDocumentKeydown);
};

// Проверка если клавиша ESC нажата

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Обработчик события нажатия на кнопку закрыть

buttonClose.addEventListener('click', () => {
  closeBigPicture();
});

export {openBigPicture};
