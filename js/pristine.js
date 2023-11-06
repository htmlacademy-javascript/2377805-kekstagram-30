const uploadForm = document.querySelector('.img-upload__form');

const pristine = new Pristine(uploadForm); // Экземляр валидатора

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});

const hashtag = /^#[a-zа-яё0-9]{1, 19}$/i;

const validateHashtags = (hashtags) => {
  const allHashtagsArray = hashtags.trim().split(' ');
  const hashtagsArray = allHashtagsArray.filter((value) => value !== '');
  return hashtagsArray;
};

console.log(validateHashtags('ffefjnf  f     f slLLLksf    fsl '));

pristine.addValidator(uploadForm.querySelector('.text__description'), validateHashtags);
