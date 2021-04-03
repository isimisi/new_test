/* eslint-disable camelcase */
import axios from 'axios';
import * as notification from '@redux/constants/notifConstants';
import { baseUrl, authHeader, genericErrorMessage } from '@api/constants';
import * as types from './nodeConstants';

const NODES = 'nodes';

export const getNodes = () => async dispatch => {
  const url = `${baseUrl}/${NODES}`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const nodes = response.data;
    dispatch({ type: types.GET_NODES_SUCCESS, nodes });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_NODES_FAILED, message });
  }
};

export const postNode = (history) => async dispatch => {
  const url = `${baseUrl}/${NODES}`;
  const body = {};
  const header = authHeader();
  try {
    const response = await axios.post(url, body, header);
    const { id } = response.data;
    dispatch({ type: types.POST_NODE_SUCCESS });
    history.push(`nodes/${id}`);
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.POST_NODE_FAILED, message });
  }
};

export const showNode = (id) => async dispatch => {
  const url = `${baseUrl}/${NODES}/${id}`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const { node } = response.data;
    dispatch({ type: types.SHOW_NODE_SUCCESS, node });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.SHOW_NODE_FAILED, message });
  }
};

export const putNode = (id, label, description, type, group_id, style, history) => async dispatch => {
  const url = `${baseUrl}/${NODES}/${id}`;
  const body = {
    label, description, type, group_id, style
  };
  const header = authHeader();
  try {
    await axios.put(url, body, header);
    const message = 'You have updated your node';
    dispatch({ type: types.PUT_NODE_SUCCESS, message });
    history.push('app/nodes');
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.PUT_NODE_FAILED, message });
  }
};

export const deleteNode = (id, title) => async dispatch => {
  const url = `${baseUrl}/${NODES}/${id}`;
  const header = authHeader();
  try {
    await axios.delete(url, header);
    const message = `You have deleted your ${title}`;
    dispatch({ type: types.DELETE_NODE_SUCCESS, message });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.DELETE_NODE_FAILED, message });
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

export const addAtrribut = attributs => ({
  type: types.ADD_ATTRIBUT,
  attributs
});

export const addType = value => ({
  type: types.ADD_TYPE,
  value
});

export const addGroup = group => ({
  type: types.ADD_GROUP,
  group
});

export const sizeChange = size => ({
  type: types.CHANGE_SIZE,
  size,
});

export const backgroundChange = color => ({
  type: types.CHANGE_BACKGROUND_COLOR,
  color,
});

export const borderChange = color => ({
  type: types.CHANGE_BORDER_COLOR,
  color,
});

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF
};
