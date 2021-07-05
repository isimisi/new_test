/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
import axios from 'axios';
import * as notification from '@redux/constants/notifConstants';
import { baseUrl, authHeader, genericErrorMessage } from '@api/constants';
import { saveToLocalStorage, loadFromLocalStorage } from '@api/localStorage/localStorage';
import * as types from './dashboardConstants';
const DASHBOARD = 'dashboard';

export const getElementCounts = () => async dispatch => {
  const url = `${baseUrl}/${DASHBOARD}/elementCounts`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const elementCounts = response.data;
    dispatch({ type: types.GET_ELEMET_COUNTS_SUCCESS, elementCounts });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_ELEMET_COUNTS_FAILED, message });
  }
};

export const getTimeline = () => async dispatch => {
  const url = `${baseUrl}/${DASHBOARD}/activity`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const timeline = response.data;
    dispatch({ type: types.GET_TIMELINE_SUCCESS, timeline });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_TIMELINE_FAILED, message });
  }
};

export const postFeatureRequest = (wish, setFeatureValue) => async dispatch => {
  const url = `${baseUrl}/${DASHBOARD}/featureRequest`;
  const body = { wish };
  const header = authHeader();
  try {
    await axios.post(url, body, header);
    const message = 'Vi har modtaget din forspørgsel';
    dispatch({ type: types.POST_FEATURE_SUCCESS, message });
    setFeatureValue('');
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.POST_FEATURE_FAILED, message });
  }
};

export const getUserInfo = () => async dispatch => {
  const url = `${baseUrl}/userInfo`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);

    const {
      user, organization
    } = response.data;

    const localStorage = loadFromLocalStorage();

    saveToLocalStorage({
      ...localStorage,
      ...user,
      ...organization,
      user_id: user.id,
      plan_id: user.plan_id || organization.plan_id
    });
  } catch (error) {

    // DO SOMETHING
  }
};


export const closeNotifAction = {
  type: notification.CLOSE_NOTIF
};
