const uploadForm = document.querySelector('.img-upload__form');
const hashtagElements = uploadForm.querySelector('.text__hashtags');
const commentElement = uploadForm.querySelector('.text__description');

// Экземляр валидатора

const pristine = new Pristine(
  uploadForm,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
  },
  false
);

// Регулярное выражение хештэга

const REGEXP_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;

// Функция преобразования данных из поля хештэгов в массив хэштегов (удаление пробелов, удаление пустых значений)

const getHashtagsArray = (hashtags) => hashtags.trim().split(' ').filter((value) => value !== '');

// Проверка хештега на соответствие регулярному выражению

const validateHashtag = (hashtags) => {
  const hashtagsArray = getHashtagsArray(hashtags);
  return hashtagsArray.every((value) => REGEXP_HASHTAG.test(value));
};

// Проверка количества хештегов

const maxQuantityHashtags = (hashtags) => {
  const hashtagsArray = getHashtagsArray(hashtags);
  if (hashtagsArray.length > 5) {
    return false;
  }
  return true;
};

// Проверка повторяющихся хештегов

const repeatHashtags = (hashtags) => {
  const hashtagsArray = getHashtagsArray(hashtags);
  const set = new Set(hashtagsArray);
  return set.size === hashtagsArray.length;
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

const buttonSubmit = uploadForm.querySelector('.img-upload__submit');

const isFormValid = () => {
  if (!pristine.validate()) {
    buttonSubmit.disabled = true;
  } else {
    buttonSubmit.disabled = false;
  }
};

// Функция сброса валидации

const resetFormValid = () => pristine.reset();

export {isFormValid, resetFormValid, hashtagElements, commentElement};
