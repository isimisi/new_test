import axios from "axios";
import * as notification from "@redux/constants/notifConstants";
import { baseUrl, authHeader, genericErrorMessage } from "@api/constants";

import * as types from "./groupConstants";
import { User } from "@auth0/auth0-react";
const GROUPS = "groups";

export const getGroups = (user: User) => async (dispatch) => {
  const url = `${baseUrl}/${GROUPS}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const groups = response.data;
    dispatch({ type: types.GET_GROUPS_SUCCESS, groups });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_GROUPS_FAILED, message });
  }
};

export const postGroup = (
  user: User,
  title: string,
  description: string,
  image: string | Blob,
  closeModal: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch) => {
  const url = `${baseUrl}/${GROUPS}?title=${title}&description=${description}${
    image
      ? ""
      : "&defaultImage=https://app-juristic-media.s3.eu-north-1.amazonaws.com/groups/default.png"
  }`;
  const body = new FormData();

  body.append("file_content", image);

  const header = authHeader(user);
  try {
    await axios.post(url, body, header);
    dispatch({ type: types.POST_GROUP_SUCCESS });
    dispatch(getGroups(user));
    closeModal(false);
  } catch (error) {
    // @ts-ignore
    console.log(error.response);
    const message = genericErrorMessage;
    dispatch({ type: types.POST_GROUP_FAILED, message });
  }
};

export const showGroup = (user: User, id: string) => async (dispatch) => {
  const url = `${baseUrl}/${GROUPS}/${id}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const group = response.data;
    dispatch({ type: types.SHOW_GROUP_SUCCESS, group });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.SHOW_GROUP_FAILED, message });
  }
};

export const putGroup = (
  user: User,
  id: string,
  title: string,
  description: string
) => async (dispatch) => {
  const url = `${baseUrl}/${GROUPS}/${id}`;
  const body = { title, description };
  const header = authHeader(user);
  try {
    await axios.put(url, body, header);
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.PUT_GROUP_FAILED, message });
  }
};

export const deleteGroup = (user: User, id: string) => async (dispatch) => {
  const url = `${baseUrl}/${GROUPS}/${id}`;
  const header = authHeader(user);

  try {
    await axios.delete(url, header);

    dispatch({ type: types.DELETE_GROUP_SUCCESS });
    dispatch(getGroups(user));
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.DELETE_GROUP_FAILED, message });
  }
};

export const titleChange = (item) => ({
  type: types.TITLE_CHANGE,
  item,
});

export const descriptionChange = (item) => ({
  type: types.DESCRIPTION_CHANGE,
  item,
});

export const imageChange = (item) => ({
  type: types.IMAGE_CHANGE,
  item,
});

export const searchAction = (keyword) => ({
  type: types.SEARCH_PRODUCT,
  keyword,
});

export const closeNotifAction = () => ({
  type: notification.CLOSE_NOTIF,
});

export const showNotifAction = (_message) => ({
  type: notification.SHOW_NOTIF,
  message: _message,
});
