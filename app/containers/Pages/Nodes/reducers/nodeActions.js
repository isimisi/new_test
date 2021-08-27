/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import axios from 'axios';
import * as notification from '@redux/constants/notifConstants';
import { baseUrl, authHeader, genericErrorMessage } from '@api/constants';
import * as types from './nodeConstants';
import { getSize } from '../constants';
const NODES = 'nodes';

export const getNodes = () => async dispatch => {
  dispatch({ type: types.GET_NODES_LOADING });
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
    const id = response.data;
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
    const node = response.data;
    if (!node.label) {
      return null;
    }
    const {
      label: title, description, style: _style, group,
      attributes
    } = node;
    const style = JSON.parse(_style);
    const { width, backgroundColor, borderColor } = style;
    const size = getSize(width);
    const emptyAttribut = {
      label: null,
      value: ''
    };
    attributes.push(emptyAttribut);
    dispatch({
      type: types.SHOW_NODE_SUCCESS,
      title,
      description,
      backgroundColor,
      borderColor,
      size,
      group,
      attributes
    });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.SHOW_NODE_FAILED, message });
  }
};

export const putNode = (id, label, description, attributes, deletedAttributes, group, style, history) => async dispatch => {
  const url = `${baseUrl}/${NODES}/${id}`;
  const body = {
    label, description, group, style, attributes, deletedAttributes
  };
  const header = authHeader();

  try {
    await axios.put(url, body, header);
    const message = 'Du har opdateret dit element';
    dispatch({ type: types.PUT_NODE_SUCCESS, message });
    history.push('/app/nodes');
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
    const message = `Du har slettet ${title}`;
    dispatch({ type: types.DELETE_NODE_SUCCESS, message });
    dispatch(getNodes());
  } catch (error) {
    let message = genericErrorMessage;

    if (error?.response?.status === 403) {
      message = 'Hov det ser vist ud til, at du bruger dette element i arbejdsområder eller betingelser, derfor kan du ikke slette den.';
    }

    dispatch({ type: types.DELETE_NODE_FAILED, message });
  }
};

export const getAttributeDropDown = (group) => async dispatch => {
  const url = `${baseUrl}/attributs/dropDownValues?group=${group}`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const attributes = response.data;
    dispatch({ type: types.GET_ATTRIBUTE_DROPDOWN_SUCCESS, attributes });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_ATTRIBUTE_DROPDOWN_FAILED, message });
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

export const addAtrribut = attributes => ({
  type: types.ADD_ATTRIBUT,
  attributes
});

export const removeAtrribut = (index, id) => ({
  type: types.REMOVE_ATTRIBUT,
  index,
  id
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
