/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
import axios from 'axios';
import * as notification from '@redux/constants/notifConstants';
import { baseUrl, authHeader } from '@api/constants';
import { saveToLocalStorage, loadFromLocalStorage } from '@api/localStorage/localStorage';
import LogRocket from 'logrocket';
import * as types from './authConstants';

export const login = (email, password, history, locationState = null) => async dispatch => {
  const url = `${baseUrl}/login`;
  const body = { email, password };

  try {
    const response = await axios.post(url, body);

    const {
      user, access_token, organization
    } = response.data;
    dispatch({ type: types.LOGIN_SUCCESS, user, access_token });
    saveToLocalStorage({
      ...access_token, ...user, ...organization, user_id: user.id
    });

    LogRocket.identify(user.id, {
      name: user.first_name + ' ' + user.last_name,
      email: user.email,
      organization: organization && organization.name,
    });


    analytics.identify(user.id, {
      name: user.first_name + ' ' + user.last_name,
      email: user.email,
      organization: organization && organization.name,
    });

    history.push(locationState?.from?.path || '/app');
  } catch (error) {
    let message = 'Hov, der er vidst nogle problemer med login. Prøv igen senere.';
    if (error.response) {
      if (Array.isArray(error?.response?.data)) {
        message = error.response.data[0].message;
      } else {
        message = error?.response?.data?.message;
      }
    }

    dispatch({ type: types.LOGIN_FAILED, message });
  }
};

export const register = (name, phone, employer, email, password, marketing, history) => async dispatch => {
  const url = `${baseUrl}/register`;
  const splittedName = name.split(' ');
  const first_name = splittedName[0];
  const last_name = splittedName[1];
  const body = {
    first_name, last_name, phone, employer, email, password, marketing
  };
  try {
    const response = await axios.post(url, body);
    const { user, access_token } = response.data;
    dispatch({ type: types.REGISTER_SUCCESS, user, access_token });
    saveToLocalStorage({ ...access_token, ...user });

    LogRocket.identify(user.id, {
      name: user.first_name + ' ' + user.last_name,
      email: user.email,
    });


    analytics.identify(user.id, {
      name: user.first_name + ' ' + user.last_name,
      email: user.email,
    });

    history.push('/app?first_visit');
  } catch (error) {
    const { message } = error.response.data[0];
    dispatch({ type: types.REGISTER_FAILED, message });
  }
};

// eslint-disable-next-line no-unused-vars
export const showUser = () => async dispatch => {
  const ls = loadFromLocalStorage();
  const url = `${baseUrl}/user/${ls.user_id}`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const user = response.data;

    saveToLocalStorage({ ...ls, ...user });
  } catch (error) {
    // DO SOMETHING
  }
};

export const resetPassword = (email, setSendPassword) => async dispatch => {
  const url = `${baseUrl}/forgotPassword`;
  const body = { email };
  try {
    await axios.post(url, body);
    dispatch({ type: types.RESET_PASSWORD_SUCCESS, email });
    setSendPassword(true);
  } catch (error) {
    let message = 'Vi havde nogle problemer med at sende mailen, prøv igen senere eller kontakt os';

    if (error?.response?.status === 403) {
      message = error.response.data.message;
    }

    dispatch({ type: types.RESET_PASSWORD_FAILED, message });
  }
};

export const newPassword = (id, password, history) => async dispatch => {
  const url = `${baseUrl}/newPassword/${id}`;
  const body = { password };

  try {
    const response = await axios.post(url, body);
    const {
      user, access_token, organization
    } = response.data;
    dispatch({ type: types.LOGIN_SUCCESS, user, access_token });
    saveToLocalStorage({
      ...access_token, ...user, ...organization, user_id: user.id
    });

    LogRocket.identify(user.id, {
      name: user.first_name + ' ' + user.last_name,
      email: user.email,
      organization: organization && organization.name,
    });

    analytics.identify(user.id, {
      name: user.first_name + ' ' + user.last_name,
      email: user.email,
      organization: organization && organization.name,
    });

    history.push('/app');
  } catch (error) {
    let message = 'Hov, der er vidst nogle problemer med login. Prøv igen senere.';
    if (error.response) {
      if (Array.isArray(error?.response?.data)) {
        message = error.response.data[0].message;
      } else {
        message = error?.response?.data?.message;
      }
    }

    dispatch({ type: types.LOGIN_FAILED, message });
  }
};

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF
};
