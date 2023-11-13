const BASE_URL = 'https://30.javascript.pages.academy/kekstagram';
const ROUTE = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const load = (route, errorText = ErrorText.GET_DATA, method = Method.GET, body = null) =>

  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getPicturesData = () => load(ROUTE.GET_DATA);

const sendFormData = (body) => load(ROUTE.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export {getPicturesData, sendFormData, ErrorText};
