import { loadFromLocalStorage } from './localStorage/localStorage';

export const baseUrl = 'http://127.0.0.1:3333';

export const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const isAuthenticated = () => {
  const tokenMatch = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]*$/;
  const { token } = loadFromLocalStorage() || {};
  return tokenMatch.test(token);
};
