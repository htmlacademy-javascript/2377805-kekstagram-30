// Функция проверки длины строки

function isValidLenght(value, validLenght) {
  return value.length <= validLenght;
}

// Cтрока короче 20 символов
isValidLenght('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
isValidLenght('проверяемая строка', 18); // true
// Строка длиннее 10 символов
isValidLenght('проверяемая строка', 10); // false


// Функция определения палиндрома

function isPalindrom(value) {
  const updatedString = value.replaceAll(' ', '').toLowerCase();
  let reverseString = '';
  for (let i = updatedString.length - 1; i >= 0; i--) {
    reverseString += updatedString[i];
  }
  return reverseString === updatedString;
}

// Строка является палиндромом
isPalindrom('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrom('ДовОд'); // true
// Это не палиндром
isPalindrom('Кекс'); // false
// Это палиндром
isPalindrom('Лёша на полке клопа нашёл '); // true


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

// Строка является палиндромом
isPalindrom2('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrom2('ДовОд'); // true
// Это не палиндром
isPalindrom2('Кекс'); // false
// Это палиндром
isPalindrom2('Лёша на полке клопа нашёл '); // true


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

getNumbers('2023 год'); // 2023
getNumbers('ECMAScript 2022'); // 2022
getNumbers('1 кефир, 0.5 батона'); // 105
getNumbers('агент 007'); // 7
getNumbers('а я томат'); // NaN
getNumbers(2023); // 2023
getNumbers(-1); // 1
getNumbers(1.5); // 15
