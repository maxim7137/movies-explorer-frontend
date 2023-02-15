import { BF_API_URL } from '../constants/constants';

class Api {
  _isServerOk(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(res.json());
  }

  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      },
    }).then(this._isServerOk);
  }
}

const MoviesApi = new Api(BF_API_URL);

export default MoviesApi;
