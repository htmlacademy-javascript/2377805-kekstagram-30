// Числовые константы

const DESCRIPTIONS_COUNT = 25; // Количество описаний к фотографиям
const MIN_LIKES = 15; // Минимальное количество лайков на фото
const MAX_LIKES = 200; // Максимальное количество лайков на фото
const COMMENTS_COUNT = 30; // Максимальное количество комментариев на фото

// Массив с исходными данными эффектов для создания слайдера

const EFFECTS = [
  {
    name: 'none',
    style: '',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
  },
  {
    name: 'chrome',
    style: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
  },
  {
    name: 'sepia',
    style: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
  },
  {
    name: 'marvin',
    style: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: 'phobos',
    style: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1,
  },
  {
    name: 'heat',
    style: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1,
  },
];

// Базовый URL

const BASE_URL = 'https://30.javascript.pages.academy/kekstagram';

// Ручка

const ROUTE = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

// Метод

const Method = {
  GET: 'GET',
  POST: 'POST',
};

// Текст ошибки

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

export {DESCRIPTIONS_COUNT, MIN_LIKES, MAX_LIKES, COMMENTS_COUNT, EFFECTS, BASE_URL, ROUTE, Method, ErrorText};
