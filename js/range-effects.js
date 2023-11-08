import {pictureList} from './thumbnail.js';
import {EFFECTS} from './const.js';

const sliderElementContainer = pictureList.querySelector('.img-upload__effect-level');
const sliderElement = pictureList.querySelector('.effect-level__slider');
const valueElement = pictureList.querySelector('.effect-level__value');
const effectsList = pictureList.querySelector('.effects__list');
const imagePreview = pictureList.querySelector('.img-upload__preview > img');

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

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    start: 1,
    step: 0.1,
    range: {
      min: 0,
      max: 1,
    },
    connect: 'lower',
  });
  hideSlider();
};

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
    hideSlider();
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

function resetSlider () {
  sliderElement.noUiSlider.reset();
  imagePreview.style.filter = null;
}

// Функция удаления слайдера

function deleteSlider () {
  sliderElement.noUiSlider.destroy();
}

// Обработчик события нажатия на эффект

effectsList.addEventListener('click', onEffectClick);

export {createSlider, deleteSlider, sliderElement, onUpdateSliderValue, effectsList, onEffectClick};
