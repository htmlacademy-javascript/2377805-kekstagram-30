import {DESCRIPTIONS, MESSAGES, NAMES, DESCRIPTIONS_COUNT, MIN_LIKES, MAX_LIKES, COMMENTS_COUNT} from './const.js';
import {getRandomInteger, getRandomArrayElement, createRandomIdFromRangeGenerator} from './utils.js';

// Раздел создания комментариев у фотографии

const generateCommentID = createRandomIdFromRangeGenerator(1, DESCRIPTIONS_COUNT * COMMENTS_COUNT);
const generateMessage = (quantity) => {
  let firstCommentIndex = getRandomInteger(0, MESSAGES.length - 1);
  let secondCommentIndex = getRandomInteger(0, MESSAGES.length - 1);
  while (firstCommentIndex === secondCommentIndex) {
    firstCommentIndex = getRandomInteger(0, MESSAGES.length - 1);
    secondCommentIndex = getRandomInteger(0, MESSAGES.length - 1);
  }
  if (quantity === 1) {
    return MESSAGES[firstCommentIndex];
  }
  return `${MESSAGES[firstCommentIndex]} ${MESSAGES[secondCommentIndex]}`;
};

const createComment = () => ({
  id: generateCommentID(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: generateMessage(getRandomInteger(1, 2)),
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
});

// Создание массива комментариев

const createCommentsArray = (quantity) => Array.from({length: quantity}, createComment);

// Функция проверки уникальности имен внутри каждого массива комментариев

const checkUniqName = (commentsArray) => {
  const namesArray = commentsArray.map((comment) => comment.name);
  let restNameArray = NAMES.filter((value) => !namesArray.includes(value));
  for (let currentCommentIndex = 0; currentCommentIndex < commentsArray.length; currentCommentIndex++) {
    const uniqName = commentsArray[currentCommentIndex].name;
    for (let j = currentCommentIndex + 1; j <= commentsArray.length - 1; j++) {
      const checkedName = commentsArray[j].name;
      if (uniqName === checkedName) {
        commentsArray[j].name = restNameArray[0];
        restNameArray = restNameArray.slice(1);
      }
    }
  }
  return commentsArray;
};

// Раздел создания описания у фотографии

const generatePhotoID = createRandomIdFromRangeGenerator(1, DESCRIPTIONS_COUNT);
const generatePhotoURL = createRandomIdFromRangeGenerator(1, DESCRIPTIONS_COUNT);

const createPhotoDescription = () => ({
  id: generatePhotoID(),
  url: `photos/${generatePhotoURL()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comment: checkUniqName(createCommentsArray(getRandomInteger(0, COMMENTS_COUNT))),
});

const createPhotoDescriptions = () => Array.from({length: DESCRIPTIONS_COUNT}, createPhotoDescription);

export {createPhotoDescriptions};
