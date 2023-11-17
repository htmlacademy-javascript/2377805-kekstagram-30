const bigPicture = document.querySelector('.big-picture'); // Блок большого изображения (ББИ)
const bigPictureImg = document.querySelector('.big-picture__img > img'); // Фото в ББИ
const likesCounter = bigPicture.querySelector('.likes-count'); // Счетчик лайков
const photoCaption = bigPicture.querySelector('.social__caption'); // Описание фотографии
const showedComments = bigPicture.querySelector('.social__comment-shown-count'); // Счетчик показанных комментариев
const totalComments = bigPicture.querySelector('.social__comment-total-count'); // Счетчик всего комментариев
const buttonMoreComments = bigPicture.querySelector('.comments-loader'); // Кнопка загрузки следующих комментариев
const commentsList = bigPicture.querySelector('.social__comments'); // Блок комментариев
const commentTemplate = commentsList.querySelector('.social__comment'); // Шаблон комментария
const buttonClose = bigPicture.querySelector('.big-picture__cancel'); // Кнопка закрыть

// Создание списка комментариев

let showedCommentsCounter = 0;

const createCommentsList = (comments) => {
  showedCommentsCounter = 0;
  let counter = 0;
  comments.forEach (({avatar, name, message}) => {
    const newComment = commentTemplate.cloneNode(true);
    newComment.querySelector('.social__picture').src = avatar;
    newComment.querySelector('.social__picture').alt = name;
    newComment.querySelector('.social__text').textContent = message;
    commentsList.append(newComment);
    showedCommentsCounter += 1;
    if (counter >= 5) {
      newComment.classList.add('hidden');
      showedCommentsCounter -= 1;
    }
    counter += 1;
  });
  showedComments.textContent = showedCommentsCounter;
};

// Функция проверки открыто максимум комментариев или нет

const checkMaxComments = () => {
  if (totalComments.textContent === showedComments.textContent) {
    buttonMoreComments.classList.add('hidden');
  }
};

// Функция показа больше комментариев

const onMoreCommentsClick = () => {
  const hiddenComments = commentsList.querySelectorAll('.hidden');

  let counter = 0;
  hiddenComments.forEach ((comment) => {
    if (counter < 5) {
      comment.classList.remove('hidden');
      counter += 1;
      showedCommentsCounter += 1;
    }
  });
  showedComments.textContent = showedCommentsCounter;
  checkMaxComments();
};

// Функция при открытии большого изображения

const openBigPicture = (miniphoto) => {
  commentsList.innerHTML = '';
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureImg.src = miniphoto.url;
  likesCounter.textContent = miniphoto.likes;
  totalComments.textContent = miniphoto.comments.length;
  photoCaption.textContent = miniphoto.description;
  createCommentsList(miniphoto.comments);
  checkMaxComments(); // для варианта 2 это не требуется

  document.addEventListener('keydown', onDocumentKeydown);
  bigPicture.addEventListener('click', onOutOfPictureClick);
};

// Функция закрытия большого изображения

const closeBigPicture = () => {
  buttonMoreComments.classList.remove('hidden');
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsList.innerHTML = '';

  document.removeEventListener('keydown', onDocumentKeydown);
  bigPicture.removeEventListener('click', onOutOfPictureClick);
};

// Проверка если клавиша ESC нажата

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

// Проверка нажатия поля вне большого изображения

function onOutOfPictureClick (evt) {
  if (!evt.target.closest('.big-picture__preview')) {
    evt.preventDefault();
    closeBigPicture();
  }
}

// Обработчик событий показать больше комментариев

buttonMoreComments.addEventListener('click', onMoreCommentsClick);

// Обработчик событий предотвращающий всплытие из заполняемых и меняемых полей

bigPicture.querySelector('.social__footer-text').addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

// Обработчик события нажатия на кнопку закрыть

buttonClose.addEventListener('click', () => {
  closeBigPicture();
});

export {openBigPicture};
