import { MY_API_URL } from '../constants/constants';

const checkAuthResponse = (res) =>
  res.ok ? res.json() : Promise.reject(res.json());

export const Signup = (name, email, password) => {
  return fetch(`${MY_API_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  }).then(checkAuthResponse);
};

export const Signin = (email, password) => {
  return fetch(`${MY_API_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(checkAuthResponse);
};

export const getToken = (token) => {
  return fetch(`${MY_API_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(checkAuthResponse);
};
