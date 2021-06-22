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

export const choosePlan = (plan, history) => async dispatch => {
  const url = `${baseUrl}/organization/plan`;
  const body = { plan_id: plan };
  const header = authHeader();
  try {
    const response = await axios.put(url, body, header);
    const { plan_id } = response.data;
    localStorage.plan_id = plan_id;
    saveToLocalStorage(localStorage);
    dispatch({ type: types.SAVE_PLAN_SUCCESS, message: 'Congratulation you are now ready to hack your productivty' });
    history.push('/app');
  } catch (error) {
    console.log(error.response);
    const message = genericErrorMessage;
    dispatch({ type: types.SAVE_PLAN_FAILED, message });
  }
};

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF
};
