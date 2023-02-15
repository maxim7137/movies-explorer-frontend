import { MY_API_URL } from '../constants/constants';

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

  getInitialUser(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      },
    }).then(this._isServerOk);
  }

  setUser({ name, email }, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
      }),
    }).then(this._isServerOk);
  }

  setCard({ name, link }, token) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._isServerOk);
  }

  delCard(_id, token) {
    return fetch(`${this._baseUrl}/movies/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      },
    }).then(this._isServerOk);
  }
}

const MainApi = new Api(MY_API_URL);

export default MainApi;
