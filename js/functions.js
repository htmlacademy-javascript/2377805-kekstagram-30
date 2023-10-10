// Функция проверки длины строки

function getValidLenght(string, validLenght) {
  return string.length <= validLenght;
}


// Функция определения палиндрома

function isPalindrom(string) {
  const updatedString = string.replaceAll(' ', '').toLowerCase();
  let viseVersaString = '';
  for (let i = updatedString.length - 1; i >= 0; i--) {
    viseVersaString += updatedString[i];
  }
  return viseVersaString === updatedString;
}

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

// Функция извлечения цифр из строки

function getNumbers(string) {
  const updatedString = string.replaceAll(' ', '').toLowerCase();
  let result = '';
  for (let i = 0; i < updatedString.length; i++) {
    if (!isNaN(parseInt(updatedString[i], 10))) {
      result += parseInt(updatedString[i], 10);
    }
  }
  if (result === '') {
    result = NaN;
  }
  return result;
}
