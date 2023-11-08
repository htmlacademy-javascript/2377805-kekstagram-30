import {pictureList} from './thumbnail.js';

const buttonClose = pictureList.querySelector('.img-upload__cancel');

const sliderElementContainer = pictureList.querySelector('.img-upload__effect-level');
const sliderElement = pictureList.querySelector('.effect-level__slider');
const valueElement = pictureList.querySelector('.effect-level__value');
const effectsList = pictureList.querySelector('.effects__list');
const imagePreview = pictureList.querySelector('.img-upload__preview > img');

// Создание массива с исходными данными
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

let currentEffect = EFFECTS[0];

// Показать слайдер

const showSlider = () => {
  sliderElementContainer.classList.remove('hidden');
};

// Скрыть слайдер

const hideSlider = () => {
  sliderElementContainer.classList.add('hidden');
};

// Проверка что выбран defaul

const isDefaultEffect = () => currentEffect.name === EFFECTS[0].name;

// Функция cоздание слайдера

const createSlider = ({step, min, max}) => {
  noUiSlider.create(sliderElement, {
    start: max,
    step,
    range: {
      min,
      max,
    },
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        if (Number.isInteger(value)) {
          return parseInt(value, 10).toFixed(0);
        }
        return parseFloat(value).toFixed(1);
      },
    }
  });
  hideSlider();
};

createSlider(currentEffect);

// Функция обновления слайдера

const updateSlider = ({step, min, max}) => {
  sliderElement.noUiSlider.updateOptions({
    start: max,
    step,
    range: {
      min,
      max,
    },
  });
  showSlider();
};

// Функция при выборе нового эффекта

const onEffectClick = (evt) => {
  const targetInput = evt.target.closest('input[type="radio"]');

  if (!targetInput) {
    return;
  }

  const currentEffectName = targetInput.value;
  currentEffect = EFFECTS.find((effect) => effect.name === currentEffectName);
  if (!isDefaultEffect()) {
    updateSlider(currentEffect);
  } else {
    resetSlider();
  }
};

// Функция изменения значения в поле вэлью и в значении фильтра

const changeEffectValue = (value) => {
  const currentStyle = currentEffect.style;
  const currentUnit = currentEffect.unit;
  imagePreview.style.filter = `${currentStyle}(${value}${currentUnit})`;
};

// Функция при изменении положения слайдера

const onUpdateSliderValue = () => {
  const currentValue = sliderElement.noUiSlider.get();
  valueElement.value = currentValue;
  changeEffectValue(currentValue);
};

// Функция сброса слайдера

function resetSlider () {               // Почему не получается импортировать эту функцию?
  imagePreview.style.filter = null;
  hideSlider();
}

buttonClose.addEventListener('click', resetSlider);

// Обработчик события изменения положения слайдера

sliderElement.noUiSlider.on('update', onUpdateSliderValue);

// Обработчик события нажатия на эффект

effectsList.addEventListener('click', onEffectClick);
