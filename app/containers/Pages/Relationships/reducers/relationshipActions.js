/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import axios from 'axios';
import * as notification from '@redux/constants/notifConstants';
import { baseUrl, authHeader, genericErrorMessage } from '@api/constants';
import * as types from './relationshipConstants';
import { getSize } from '../constants';

const RELATIONSHIPS = 'relationships';

export const getRelationships = () => async dispatch => {
  const url = `${baseUrl}/${RELATIONSHIPS}`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const relationships = response.data;
    dispatch({ type: types.GET_RELATIONSHIPS_SUCCESS, relationships });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_RELATIONSHIPS_FAILED, message });
  }
};

export const postRelationship = (history) => async dispatch => {
  const url = `${baseUrl}/${RELATIONSHIPS}`;
  const body = {};
  const header = authHeader();
  try {
    const response = await axios.post(url, body, header);
    const id = response.data;
    dispatch({ type: types.POST_RELATIONSHIP_SUCCESS });
    history.push(`${RELATIONSHIPS}/${id}`);
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.POST_RELATIONSHIP_FAILED, message });
  }
};

export const showRelationship = (id) => async dispatch => {
  const url = `${baseUrl}/${RELATIONSHIPS}/${id}`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const relationship = response.data;
    if (!relationship.label) {
      return null;
    }
    const {
      label, description, style: _style, label_style, group, values
    } = relationship;
    const style = JSON.parse(_style);
    const labelStyle = JSON.parse(label_style);
    const { color } = style;
    const { fontSize } = labelStyle;
    const size = getSize(fontSize);

    dispatch({
      type: types.SHOW_RELATIONSHIP_SUCCESS,
      label,
      description,
      color,
      size,
      group,
      values
    });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.SHOW_RELATIONSHIP_FAILED, message });
  }
};

export const putRelationship = (id, label, values, description, style, label_style, group, history,) => async dispatch => {
  const url = `${baseUrl}/${RELATIONSHIPS}/${id}`;
  const body = {
    label, values, description, style, label_style, group
  };
  const header = authHeader();
  try {
    await axios.put(url, body, header);
    const message = 'Du har opdateret forbindelsen';
    dispatch({ type: types.PUT_RELATIONSHIP_SUCCESS, message });
    history.push(`/app/${RELATIONSHIPS}`);
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.PUT_RELATIONSHIP_FAILED, message });
  }
};

export const deleteRelationship = (id, title) => async dispatch => {
  const url = `${baseUrl}/${RELATIONSHIPS}/${id}`;
  const header = authHeader();
  try {
    await axios.delete(url, header);
    const message = `Du har slettet ${title}`;
    dispatch({ type: types.DELETE_RELATIONSHIP_SUCCESS, message });
    dispatch(getRelationships());
  } catch (error) {
    let message = genericErrorMessage;
    if (error?.response?.status === 403) {
      message = 'Hov det ser vist ud til, at du bruger denne forbindelse i arbejdsområder eller betingelser, derfor kan du ikke slette den.';
    }
    dispatch({ type: types.DELETE_RELATIONSHIP_FAILED, message });
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

export const valuesChange = values => ({
  type: types.VALUES_CHANGE,
  values
});

export const addGroup = group => ({
  type: types.ADD_GROUP,
  group
});

export const sizeChange = size => ({
  type: types.CHANGE_SIZE,
  size,
});

export const colorChange = color => ({
  type: types.CHANGE_COLOR,
  color,
});

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF
};
