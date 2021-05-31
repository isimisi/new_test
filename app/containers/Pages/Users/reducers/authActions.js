/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
import axios from 'axios';
import * as notification from '@redux/constants/notifConstants';
import { baseUrl } from '@api/constants';
import { saveToLocalStorage } from '@api/localStorage/localStorage';
import LogRocket from 'logrocket';
import * as types from './authConstants';

export const login = (email, password, history, locationState) => async dispatch => {
  const url = `${baseUrl}/login`;
  const body = { email, password };

  try {
    const response = await axios.post(url, body);
    console.log(response);
    const {
      user, access_token, organization
    } = response.data;
    dispatch({ type: types.LOGIN_SUCCESS, user, access_token });
    saveToLocalStorage({
      ...access_token, ...user, ...organization
    });
    LogRocket.identify(user.id, {
      name: user.first_name + ' ' + user.last_name,
      email: user.email,
      organization: organization && organization.name,
    });
    history.push(locationState?.from?.path || '/app');
  } catch (error) {
    let message = 'Oops there was some trouble with your login';
    console.log(error);
    if (Array.isArray(error.response.data)) {
      message = error.response.data[0].message;
    } else {
      message = error.response.data.message;
    }

    dispatch({ type: types.LOGIN_FAILED, message });
  }
};

export const register = (name, email, password, history) => async dispatch => {
  const url = `${baseUrl}/register`;
  const splittedName = name.split(' ');
  const first_name = splittedName[0];
  const last_name = splittedName[1];
  const body = {
    first_name, last_name, email, password
  };
  try {
    const response = await axios.post(url, body);
    const { user, access_token } = response.data;
    dispatch({ type: types.REGISTER_SUCCESS, user, access_token });
    saveToLocalStorage({ ...access_token, ...user });
    history.push('/app');
  } catch (error) {
    const { message } = error.response.data[0];
    dispatch({ type: types.REGISTER_FAILED, message });
  }
};

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF
};
