/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import axios from 'axios';
import * as notification from '@redux/constants/notifConstants';
import { baseUrl, authHeader, genericErrorMessage } from '@api/constants';
import * as types from './attributeConstants';
const ATTRIBUTS = 'attributs';

export const getAttributes = () => async dispatch => {
  const url = `${baseUrl}/${ATTRIBUTS}`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const attributes = response.data;
    dispatch({ type: types.GET_ATTRIBUTES_SUCCESS, attributes });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_ATTRIBUTES_FAILED, message });
  }
};

export const postAttribute = () => async dispatch => {
  const url = `${baseUrl}/${ATTRIBUTS}`;
  const body = {};
  const header = authHeader();
  try {
    await axios.post(url, body, header);
    dispatch({ type: types.POST_ATTRIBUTE_SUCCESS });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.POST_ATTRIBUTE_FAILED, message });
  }
};

export const showAttribute = (id) => async dispatch => {
  const url = `${baseUrl}/${ATTRIBUTS}/${id}`;
  const header = authHeader();

  try {
    const response = await axios.get(url, header);
    const {
      label, description, type: valueType, selectionOptions, group
    } = response.data;

    dispatch({
      type: types.SHOW_ATTRIBUTE_SUCCESS,
      label,
      description,
      valueType,
      selectionOptions: JSON.parse(selectionOptions),
      group
    });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.SHOW_ATTRIBUTE_FAILED, message });
  }
};

export const putAttribute = (id, /* other values */ history) => async dispatch => {
  const url = `${baseUrl}/${ATTRIBUTS}/${id}`;
  const body = {};
  const header = authHeader();

  try {
    await axios.put(url, body, header);
    const message = 'You have updated your node';
    dispatch({ type: types.PUT_ATTRIBUTE_SUCCESS, message });
    history.push('/app/attributes');
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.PUT_ATTRIBUTE_FAILED, message });
  }
};

export const deleteAttribute = (id, title) => async dispatch => {
  const url = `${baseUrl}/${ATTRIBUTS}/${id}`;
  const header = authHeader();

  try {
    await axios.delete(url, header);
    const message = `You have deleted ${title}`;
    dispatch({ type: types.PUT_ATTRIBUTE_SUCCESS, message });
    dispatch(getAttributes());
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.PUT_ATTRIBUTE_FAILED, message });
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

export const labelChange = label => ({
  type: types.LABEL_CHANGE,
  label,
});

export const descriptionChange = description => ({
  type: types.DESCRIPTION_CHANGE,
  description,
});

export const changeSelectionValues = selectionOptions => ({
  type: types.SELECTION_VALUES,
  selectionOptions,
});

export const addType = value => ({
  type: types.ADD_TYPE,
  value
});

export const addGroup = group => ({
  type: types.ADD_GROUP,
  group
});

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF
};
