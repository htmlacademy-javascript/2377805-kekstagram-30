const MAX_HASTAGS = 5; // Максимально количество хэштегов
const REGEXP_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i; // Регулярное выражение хештэга
const TEXT_ERROR = {
  invalidHashtag: 'Длина хештега должна быть от 1 до 20 символов и начинаться с символа #',
  unvalidQuantityHashtags: `Количество хештегов не должно превышать ${MAX_HASTAGS}`,
  hashtagsNotUnique: 'Хештеги не должны повторяться',
};

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

// Функция преобразования данных из поля хештэгов в массив хэштегов (удаление пробелов, удаление пустых значений)

const getHashtagsArray = (hashtags) => hashtags.trim().split(' ').filter((value) => value !== '');

// Проверка хештега на соответствие регулярному выражению

const isHashtagValid = (hashtags) => {
  const hashtagsArray = getHashtagsArray(hashtags);
  return hashtagsArray.every((value) => REGEXP_HASHTAG.test(value));
};

// Проверка количества хештегов

const isValidHashtagsCount = (hashtags) => {
  const hashtagsArray = getHashtagsArray(hashtags);
  return hashtagsArray.length <= MAX_HASTAGS;
};

// Проверка повторяющихся хештегов

const isUniqHashtags = (hashtags) => {
  const hashtagsArray = getHashtagsArray(hashtags).map((value) => value.toLowerCase());
  const set = new Set(hashtagsArray);
  return set.size === hashtagsArray.length;
};

// Добавление функций проверок в валидатор хэштегов

pristine.addValidator(
  hashtagElements,
  isHashtagValid,
  TEXT_ERROR.invalidHashtag,
  1
);

pristine.addValidator(
  hashtagElements,
  isValidHashtagsCount,
  TEXT_ERROR.unvalidQuantityHashtags,
  2
);

pristine.addValidator(
  hashtagElements,
  isUniqHashtags,
  TEXT_ERROR.hashtagsNotUnique,
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

const onFormFieldBlur = () => {
  buttonSubmit.disabled = !pristine.validate();
};

// Функция сброса валидации

const resetFormValid = () => pristine.reset();

export {onFormFieldBlur, resetFormValid, hashtagElements, commentElement, pristine};
