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

export const postAlert = (history) => async dispatch => {
  const url = `${baseUrl}/${ALERTS}`;
  const body = {};
  const header = authHeader();
  try {
    const response = await axios.post(url, body, header);
    const { id } = response.data;
    dispatch({ type: types.POST_ALERT_SUCCESS });
    history.push(`red flags/${id}`);
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.POST_ALERT_FAILED, message });
  }
};

export const showAlert = (id) => async dispatch => {
  const url = `${baseUrl}/${ALERTS}/${id}`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const {
      label: title, description, group, conditions
    } = response.data;

    dispatch({
      type: types.SHOW_ALERT_SUCCESS, title, description, group, conditions
    });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.SHOW_ALERT_FAILED, message });
  }
};

export const putAlert = (history, id, label, description, group, conditions, deletedConditions) => async dispatch => {
  const url = `${baseUrl}/${ALERTS}/${id}`;
  const body = {
    label, description, group, conditions, deletedConditions
  };
  const header = authHeader();
  try {
    await axios.put(url, body, header);
    const message = 'Your red flag has now been updated';
    dispatch({
      type: types.PUT_ALERT_SUCCESS, message
    });

    history.push('/app/red flags');
  } catch (error) {
    console.log(error.response);
    const message = genericErrorMessage;
    dispatch({ type: types.PUT_ALERT_FAILED, message });
  }
};

export const deleteAlert = (id, title) => async dispatch => {
  const url = `${baseUrl}/${ALERTS}/${id}`;
  const header = authHeader();
  try {
    await axios.delete(url, header);
    const message = `You have deleted ${title}`;
    dispatch({
      type: types.DELETE_ALERT_SUCCESS, message
    });
    dispatch(getAlerts());
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.DELETE_ALERT_FAILED, message });
  }
};

export const getConditionsDropDown = () => async dispatch => {
  const url = `${baseUrl}/conditions/dropDownValues`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const conditions = response.data;
    dispatch({ type: types.GET_CONDITION_DROPDOWN_SUCCESS, conditions });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_CONDITION_DROPDOWN_FAILED, message });
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

export const addCondition = condition => ({
  type: types.ALERT_ADD_CONDITION,
  condition
});

export const changeCondition = (condition, index) => ({
  type: types.ALERT_CHANGE_CONDITION,
  condition,
  index
});

export const deleteCondition = index => ({
  type: types.ALERT_DELETE_CONDITION,
  index
});

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF
};
