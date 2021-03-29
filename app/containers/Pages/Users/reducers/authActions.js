/* eslint-disable camelcase */
import axios from 'axios';
import * as notification from '@redux/constants/notifConstants';
import { baseUrl } from '@api/constants';
import * as types from './authConstants';

export const login = (email, password, history, locationState) => async dispatch => {
  const url = `${baseUrl}/login`;
  const body = { email, password };

  try {
    const response = await axios.post(url, body);
    console.log(response);
    const { user, access_token } = response.data;
    dispatch({ type: types.LOGIN_SUCCES, user, access_token });
    history.push(locationState?.from?.path || '/app');
  } catch (error) {
    const { message } = error.response.data[0];
    dispatch({ type: types.LOGIN_FAILED, message });
  }
};

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF
};
