// Функция проверки длины строки

function isValidLenght(string, validLenght) {
  return string.length <= validLenght;
}

// Cтрока короче 20 символов
isValidLenght('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
isValidLenght('проверяемая строка', 18); // true
// Строка длиннее 10 символов
isValidLenght('проверяемая строка', 10); // false


// Функция определения палиндрома

function isPalindrom(string) {
  const updatedString = string.replaceAll(' ', '').toLowerCase();
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

function isPalindrom2(string) {
  const updatedString = string.replaceAll(' ', '').toLowerCase();
  let result = true;
  for (let i = 0; i <= updatedString.length / 2; i++) {
    if (updatedString[i] !== updatedString[updatedString.length - (i + 1)]) {
      result = false;
      return result;
    }
  }
  return result;
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

function getNumbers(string) {
  const updatedString = string.replaceAll(' ', '').toLowerCase();
  let result = '';
  for (let i = 0; i < updatedString.length; i++) {
    if (!isNaN(parseInt(updatedString[i], 10))) {
      result += parseInt(updatedString[i], 10);
    }
  }
  return parseInt(result, 10);
}

getNumbers('2023 год');            // 2023
getNumbers('ECMAScript 2022');     // 2022
getNumbers('1 кефир, 0.5 батона'); // 105
getNumbers('агент 007');           // 7
getNumbers('а я томат');           // NaN
getNumbers(2023); // 2023
getNumbers(-1);   // 1
getNumbers(1.5);  // 15
