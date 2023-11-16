import {ErrorText} from './const.js';

// Функция генерации случайного числа от min до max

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

// Функция получения случайного индекса элемента массива

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Функция генератор для получения массива уникальных номеров из диапазона

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error(`Перебраны все числа из диапазона от ${min} до ${max}`);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

// Функция проверки длины строки

const isValidLenght = (value, validLenght) => value.length <= validLenght;

// Функция определения палиндрома

const isPalindrom = (value) => {
  const updatedString = value.replaceAll(' ', '').toLowerCase();
  let reverseString = '';
  for (let i = updatedString.length - 1; i >= 0; i--) {
    reverseString += updatedString[i];
  }
  return reverseString === updatedString;
};

// Функция определения палиндрома v.2

const isPalindrom2 = (value) => {
  const updatedString = value.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i < updatedString.length / 2; i++) {
    if (updatedString[i] !== updatedString[updatedString.length - (i + 1)]) {
      return false;
    }
  }
  return true;
};

// Функция извлечения цифр из строки

const getNumbers = (value) => {
  let result = '';
  for (let i = 0; i < value.length; i++) {
    const currentChar = parseInt(value[i], 10);
    if (!isNaN(currentChar)) {
      result += currentChar;
    }
  }
  return parseInt(result, 10);
};

// Функция проверки времени окончания встречи

const timeToMinutes = (value) => Number((value.split(':'))[0]) * 60 + Number((value.split(':'))[1]);

const checkEndMeeting = (startDay, finishDay, startMeeting, meetingDuration) => {
  const startDayMinutes = timeToMinutes(startDay);
  const finishDayMinutes = timeToMinutes(finishDay);
  const startMeetingMinutes = timeToMinutes(startMeeting);
  const finishMeetingMinutes = startMeetingMinutes + meetingDuration;
  return finishMeetingMinutes <= finishDayMinutes && finishMeetingMinutes >= startDayMinutes;
};

// Функция показа ошибки при загрузке данных

const uploadErrorMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const REMOVE_UPLOAD_MESSAGE_TIMEOUT = 5000;

const showUploadErrorMessage = () => {
  const uploadErrorMessage = uploadErrorMessageTemplate.cloneNode(true);
  uploadErrorMessage.textContent = ErrorText.GET_DATA;
  document.body.append(uploadErrorMessage);

  setTimeout(() => {
    uploadErrorMessage.remove();
  }, REMOVE_UPLOAD_MESSAGE_TIMEOUT);
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay.
  };
}

export {getRandomInteger, getRandomArrayElement, createRandomIdFromRangeGenerator, showUploadErrorMessage, debounce};
