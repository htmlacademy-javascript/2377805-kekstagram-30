// Функция генерации случайного числа от min до max

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// Функция получения случайного индекса элемента массива

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Функция генератор для получения массива уникальных номеров из диапазона

function createRandomIdFromRangeGenerator (min, max) {
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
}

// Функция проверки длины строки

function isValidLenght(value, validLenght) {
  return value.length <= validLenght;
}

// Функция определения палиндрома

function isPalindrom(value) {
  const updatedString = value.replaceAll(' ', '').toLowerCase();
  let reverseString = '';
  for (let i = updatedString.length - 1; i >= 0; i--) {
    reverseString += updatedString[i];
  }
  return reverseString === updatedString;
}

// Функция определения палиндрома v.2

function isPalindrom2(value) {
  const updatedString = value.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i < updatedString.length / 2; i++) {
    if (updatedString[i] !== updatedString[updatedString.length - (i + 1)]) {
      return false;
    }
  }
  return true;
}

// Функция извлечения цифр из строки

function getNumbers(value) {
  let result = '';
  for (let i = 0; i < value.length; i++) {
    const currentChar = parseInt(value[i], 10);
    if (!isNaN(currentChar)) {
      result += currentChar;
    }
  }
  return parseInt(result, 10);
}

// Функция проверки времени окончания встречи

const changeHoursToMinutes = (value) => Number((value.split(':'))[0]) * 60 + Number((value.split(':'))[1]);

function checkEndMeeting(startDay, finishDay, startMeeting, meetingDuration) {
  const startDayMinutes = changeHoursToMinutes(startDay);
  const finishDayMinutes = changeHoursToMinutes(finishDay);
  const startMeetingMinutes = changeHoursToMinutes(startMeeting);
  const finishMeetingMinutes = startMeetingMinutes + meetingDuration;
  if (finishMeetingMinutes <= finishDayMinutes && finishMeetingMinutes >= startDayMinutes) {
    return true;
  }
  return false;
}

export {getRandomInteger, getRandomArrayElement, createRandomIdFromRangeGenerator};
