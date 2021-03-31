import { loadFromLocalStorage } from './localStorage/localStorage';

export const baseUrl = process.env.NODE_ENV === 'production' ? 'https://juristic-api-gateway.vercel.app' : 'http://127.0.0.1:3333';

export const isAuthenticated = () => {
  const tokenMatch = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]*$/;
  const { token } = loadFromLocalStorage() || {};
  return tokenMatch.test(token);
};

const getToken = () => {
  const { token } = loadFromLocalStorage() || {};
  return token;
};

export const authHeader = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

export const genericErrorMessage = 'Oops, it seems like we have some problems with our servers, try again later';
