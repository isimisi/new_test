import { loadFromLocalStorage } from './localStorage/localStorage';

export const baseUrl = process.env.NODE_ENV === 'production' ? 'https://juristic-api-gateway.vercel.app' : 'http://127.0.0.1:3333';

export const isAuthenticated = () => {
  const tokenMatch = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]*$/;
  const { token } = loadFromLocalStorage() || {};
  return tokenMatch.test(token);
};

export const getStatus = () => {
  const { status } = loadFromLocalStorage() || {};
  return status;
};

const getToken = () => {
  const { token } = loadFromLocalStorage() || {};
  return token;
};

export const authHeader = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

export const genericErrorMessage = 'Oops, it seems like we have some problems with our servers, try again later';

export const validURL = (str) => {
  const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
    + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
    + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
    + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
    + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
    + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(str);
};

export const plans = ['Lite', 'Base', 'Draw', 'Pro'];
