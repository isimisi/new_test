import axios from 'axios';
import * as notification from '@redux/constants/notifConstants';
import { baseUrl, authHeader, genericErrorMessage } from '@api/constants';
import * as types from './groupConstants';
const GROUPS = 'groups';

export const getGroups = () => async dispatch => {
  const url = `${baseUrl}/${GROUPS}`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const groups = response.data;
    dispatch({ type: types.GET_GROUPS_SUCCESS, groups });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_GROUPS_FAILED, message });
  }
};

export const postGroup = (title, description, image, closeModal) => async dispatch => {
  const url = `${baseUrl}/${GROUPS}?title=${title}&description=${description}`;
  const body = new FormData();
  body.append('file_content', image);
  const header = authHeader();
  try {
    await axios.post(url, body, header);
    const message = 'You have created your group';
    dispatch({ type: types.POST_GROUP_SUCCESS, message });
    dispatch(getGroups());
    closeModal(false);
  } catch (error) {
    const message = genericErrorMessage;
    console.log(error.response);

    dispatch({ type: types.POST_GROUP_FAILED, message });
  }
};

export const showGroup = (id) => async dispatch => {
  const url = `${baseUrl}/${GROUPS}/${id}`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const group = response.data;
    dispatch({ type: types.SHOW_GROUP_SUCCESS, group });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.SHOW_GROUP_FAILED, message });
  }
};

export const putGroup = (id, title, description) => async dispatch => {
  const url = `${baseUrl}/${GROUPS}/${id}`;
  const body = { title, description };
  const header = authHeader();
  try {
    await axios.put(url, body, header);
    console.log('success');
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.PUT_GROUP_FAILED, message });
  }
};

export const deleteGroup = (id) => async dispatch => {
  const url = `${baseUrl}/${GROUPS}/${id}`;
  const header = authHeader();
  try {
    await axios.delete(url, header);
    const message = 'You have now deleted a group';
    dispatch({ type: types.DELETE_GROUP_SUCCESS, message });
    dispatch(getGroups());
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.DELETE_GROUP_FAILED, message });
  }
};

export const titleChange = item => ({
  type: types.TITLE_CHANGE,
  item
});

export const descriptionChange = item => ({
  type: types.DESCRIPTION_CHANGE,
  item
});

export const imageChange = item => ({
  type: types.IMAGE_CHANGE,
  item
});

export const searchAction = keyword => ({
  type: types.SEARCH_PRODUCT,
  keyword,
});

export const closeNotifAction = () => ({
  type: notification.CLOSE_NOTIF
});
