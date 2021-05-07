/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import axios from 'axios';
import * as notification from '@redux/constants/notifConstants';
import { baseUrl, authHeader, genericErrorMessage } from '@api/constants';
import * as types from './alertConstants';
const ALERTS = 'alerts';

export const getAlerts = () => async dispatch => {
  const url = `${baseUrl}/${ALERTS}`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const alerts = response.data;
    dispatch({ type: types.GET_ALERTS_SUCCESS, alerts });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_ALERTS_FAILED, message });
  }
};

export const getGroupDropDown = () => async dispatch => {
  const url = `${baseUrl}/groups/dropDownValues`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const groups = response.data;
    dispatch({ type: types.GET_GROUP_DROPDOWN_SUCCESS, groups });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_GROUP_DROPDOWN_FAILED, message });
  }
};

export const titleChange = title => ({
  type: types.TITLE_CHANGE,
  title,
});

export const descriptionChange = description => ({
  type: types.DESCRIPTION_CHANGE,
  description,
});

export const addGroup = group => ({
  type: types.ADD_GROUP,
  group
});

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF
};
