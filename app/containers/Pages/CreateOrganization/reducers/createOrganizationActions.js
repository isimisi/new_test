/* eslint-disable camelcase */
import axios from 'axios';
import * as notification from '@redux/constants/notifConstants';
import { baseUrl, authHeader, genericErrorMessage } from '@api/constants';
import { saveToLocalStorage, loadFromLocalStorage } from '@api/localStorage/localStorage';
import * as types from './createOrganizationConstants';

const localStorage = loadFromLocalStorage();


export const createOrganization = (cvr, country, history) => async dispatch => {
  const url = `${baseUrl}/organization`;
  const body = { cvr, country };
  const header = authHeader();
  try {
    const response = await axios.post(url, body, header);
    const organization_id = response.data.organization.id;
    localStorage.organization_id = organization_id;
    saveToLocalStorage(localStorage);
    history.push('/app/create/organiazation/choose/plan');
  } catch (error) {
    let message = genericErrorMessage;
    if (error.response) {
      const { message: validatorMessage } = error.response.data;
      message = validatorMessage;
    }
    dispatch({ type: types.STORE_ORGANIZATION_FAILED, message });
  }
};

export const askForADemo = (id) => async dispatch => {
  const url = `${baseUrl}/user/demo/${id}`;
  const header = authHeader();
  try {
    await axios.get(url, header);
    const message = 'Tak for din interesse. Vi kontakter dig hurtigst muligt angående tid for demo.';
    dispatch({ type: types.DEMO_SUCCESS, message });
  } catch (error) {
    const message = 'Hov, vi har nogle problemer, så mailen blev ikke sendt, prøv direkte på hej@juristic.io';
    dispatch({ type: types.DEMO_FAILED, message });
  }
};

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF
};
