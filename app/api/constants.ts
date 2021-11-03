/* eslint-disable no-prototype-builtins */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */

import { loadFromLocalStorage } from '@utils/localStorage';
import CryptoJS from 'crypto-js';
import { RouteComponentProps } from 'react-router-dom';


export const baseUrl = window.location.href === 'https://juristic-web-app-staging.herokuapp.com/'
  ? 'https://juristic-api-gateway-staging.herokuapp.com'
  : process.env.NODE_ENV === 'production'
    ? 'https://juristic-api-gateway.herokuapp.com'
    : 'http://127.0.0.1:3333';

export const isAuthenticated = () => {
  const tokenMatch = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]*$/;
  const { token } = loadFromLocalStorage() || {};
  return tokenMatch.test(token);
};

export const getStatus = (): string => {
  const { status } = loadFromLocalStorage() || {};
  return status;
};

export const getToken = (): string => {
  const { token } = loadFromLocalStorage() || {};
  return token;
};

export const authHeader = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

export const genericErrorMessage = 'Oops, it seems like we have some problems with our servers, try again later';

export const validURL = (str: string): boolean => {
  const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
    + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
    + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
    + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
    + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
    + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(str);
};

export const plans = ['Base', 'Draw', 'Pro'];

export const getId = (history: RouteComponentProps<'history'>) => {
  const id = history.location.pathname.split('/').pop();
  if (typeof id === 'string') {
    return CryptoJS.AES
      .decrypt(decodeURIComponent(id), 'path')
      ?.toString(CryptoJS.enc.Utf8)
    || id;
  }
  return id;
};
export const getIdFromEncrypted = (id: string): string => CryptoJS.AES.decrypt(decodeURIComponent(id), 'path')?.toString(CryptoJS.enc.Utf8);
export const encryptId = (id: string): string => id && encodeURIComponent(CryptoJS.AES.encrypt(id.toString(), 'path').toString());

export const generateRandomString = () => Math.random().toString(36).substring(7);
