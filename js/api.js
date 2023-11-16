import {BASE_URL, ROUTE, Method, ErrorText} from './const.js';

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

export {getPicturesData, sendFormData};
