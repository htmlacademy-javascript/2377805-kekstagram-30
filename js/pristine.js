const uploadForm = document.querySelector('.img-upload__form');
const hashtagElements = uploadForm.querySelector('.text__hashtags');
const commentElement = uploadForm.querySelector('.text__description');

// Экземляр валидатора

const pristine = new Pristine(
  uploadForm,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
  },
  false
);

// Регулярное выражение хештэга

const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

// Проверка хештега на соответствие регулярному выражению

const validateHashtag = (hashtags) => {
  let isValid = true;
  const hashtagsArray = hashtags
    .trim()
    .split(' ')
    .filter((value) => value !== '');
  hashtagsArray.forEach((value) => {
    if (!hashtag.test(value)) {
      isValid = false;
    }
  });
  return isValid;
};

// Проверка количества хештегов

const maxQuantityHashtags = (hashtags) => {
  const hashtagsArray = hashtags
    .trim()
    .split(' ')
    .filter((value) => value !== '');
  if (hashtagsArray.length > 5) {
    return false;
  }
  return true;
};

// Проверка повторяющихся хештегов

const repeatHashtags = (hashtags) => {
  const hashtagsArray = hashtags
    .trim()
    .split(' ')
    .filter((value) => value !== '');
  for (let i = 0; i < hashtagsArray.length; i++) {
    for (let j = i + 1; j < hashtagsArray.length; j++) {
      if (hashtagsArray[i] === hashtagsArray[j]) {
        return false;
      }
    }
  }
  return true;
};

// Добавление функций проверок в валидатор хэштегов

pristine.addValidator(
  hashtagElements,
  validateHashtag,
  'Длина хештега должна быть от 1 до 20 символов и начинаться с символа #',
  1
);

pristine.addValidator(
  hashtagElements,
  maxQuantityHashtags,
  'Количество хештегов не должно превышать 5',
  2
);


pristine.addValidator(
  hashtagElements,
  repeatHashtags,
  'Хештеги не должны повторяться',
  3
);

// Проверка комментария на соответствие длины

const maxCommentLength = (comment) => comment.length <= 140;

// Добавление функции проверки в валидатор комментария

pristine.addValidator(
  commentElement,
  maxCommentLength,
  'Длина не может составлять более 140 символов'
);

// Функция вызова валидации

const isFormValid = () => pristine.validate();

// Функция сброса валидации

const resetFormValid = () => pristine.reset();

export {isFormValid, resetFormValid, hashtagElements, commentElement};
