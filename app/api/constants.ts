/* eslint-disable no-prototype-builtins */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */

import { AuthUser, getToken } from '@helpers/userInfo';
import CryptoJS from 'crypto-js';
import { History } from 'history';

export const baseUrl = window.location.hostname === 'juristic-web-app-staging.herokuapp.com'
  ? 'https://juristic-api-gateway-staging.herokuapp.com'
  : process.env.NODE_ENV === 'production'
    ? 'https://juristic-api-gateway.herokuapp.com'
    : window.location.hostname === 'juristicfrontend.eu.ngrok.io' ? "https://juristicapi.eu.ngrok.io" : "http://localhost:3333";

export interface HttpHeader {
  headers: {
    Authorization: string
  };
  params?: any
}

export const authHeader = (user: AuthUser): HttpHeader => ({
  headers: { Authorization: `Bearer ${getToken(user)}` },
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

export const getId = (history: History) => {
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
