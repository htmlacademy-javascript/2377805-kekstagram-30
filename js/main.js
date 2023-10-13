// Массивы исходных данных

const DESCRIPTIONS = [
  'Прекрасный пейзаж!',
  'А тут Кекс сам не свой',
  'Отправились в поход несмотря на дождь',
  'Долгожданная покупка машины!',
  'Интересно, а сколько еще мы буем стоять в пробке?',
  'Лучший музей Москвы!',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Никита Кожемяка',
  'Василий',
  'NaGiBaToR2003',
  'Алина бьюти блогер',
  'Анвар',
  'Мистер Кредо',
  'Анатолий Анатолий',
  'Виктор Ильич',
  'Дизайн интерьера Ростов',
  'Дальнобой',
  'Максим',
  'Кекс',
  'Лариса',
  'Хмтл академович',
  'Ольга',
  'Алексей',
  'не Алексей',
  'Симпл',
  'Димпл',
  'Тамара',
  'Харитон',
  'Елена',
  'Критик',
  'Макар',
  'Инстасамец',
  'Александр',
  'Бариста',
  'Игорь',
  'Ульяна',
  'Замыкающий',
];

// Числовые константы

const DESCRIPTIONS_COUNT = 25; // Количество описаний к фотографиям
const MIN_LIKES = 15; // Минимальное количество лайков на фото
const MAX_LIKES = 200; // Максимальное количество лайков на фото
const COMMENTS_COUNT = 30; // Максимальное количество комментариев на фото

// Функция генерации случайного числа от min до max

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// Функция получения элемента массива по случайному номеру

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Функция генератор для получения массива уникальных номеров из диапазона

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generateCommentID = createRandomIdFromRangeGenerator(1, 100000);
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
  return MESSAGES[firstCommentIndex] + ' ' + MESSAGES[secondCommentIndex];
};

const createComment = () => {
  return {
    id: generateCommentID(),
    avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
    message: generateMessage(getRandomInteger(1, 2)),
    name: NAMES[getRandomInteger(0, COMMENTS_COUNT - 1)],
  };
};

function createCommentsArray (quantity) {
  return Array.from({length: quantity}, createComment);
}

const generatePhotoID = createRandomIdFromRangeGenerator(1, DESCRIPTIONS_COUNT);
const generatePhotoURL = createRandomIdFromRangeGenerator(1, DESCRIPTIONS_COUNT);

const createPhotoDescription = () => {
  return {
    id: generatePhotoID(),
    url: 'photos/' + generatePhotoURL() + '.jpg',
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comment: createCommentsArray(getRandomInteger(0, COMMENTS_COUNT)),
  };
};

const photoDescriptions = Array.from({length: DESCRIPTIONS_COUNT}, createPhotoDescription);

console.log(photoDescriptions);
