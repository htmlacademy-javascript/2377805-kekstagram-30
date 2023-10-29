import {pictureList} from './thumbnail.js';
import {photoDescriptions} from './photo-description.js';

const thumbnailsCollection = pictureList.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImgContainer = document.querySelector('.big-picture__img');
const bigPictureImg = bigPictureImgContainer.querySelector('img');
const likesCounter = bigPicture.querySelector('.likes-count');
const showedComments = bigPicture.querySelector('.social__comment-shown-count');
const photoCaption = bigPicture.querySelector('.social__caption');

const totalComments = bigPicture.querySelector('.social__comment-total-count');
const photoComments = photoDescriptions.map((value) => value.comment);
console.log(photoComments)
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');

const buttonClose = bigPicture.querySelector('.big-picture__cancel');

const createCommentsList = (comments) => {
  comments.forEach (({avatar, name, message}) => {
    const newComment = commentTemplate.cloneNode(true);
    newComment.querySelector('.social__picture').src = avatar;
    newComment.querySelector('.social__picture').alt = name;
    newComment.querySelector('.social__text').textContent = message;
    commentsList.append(newComment);
  });
};

const openBigPicture = (miniPhotos) => {

  miniPhotos.forEach((miniphoto, index) => {
    console.log(miniphoto);
    miniphoto.addEventListener('click', () => {
      bigPicture.classList.remove('hidden');
      commentsList.innerHTML = '';
      bigPictureImg.src = miniphoto.querySelector('img').src;
      likesCounter.textContent = miniphoto.querySelector('.picture__likes').textContent;
      totalComments.textContent = miniphoto.querySelector('.picture__comments').textContent;
      // как показать количество показанных комментариев, что это за величина вообще???
      photoCaption.textContent = miniphoto.querySelector('img').alt;
      createCommentsList(photoComments[index]);
    });
  });
};

buttonClose.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
});

openBigPicture(thumbnailsCollection);

