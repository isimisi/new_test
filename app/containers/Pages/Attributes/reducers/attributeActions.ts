/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import axios from "axios";
import * as notification from "@redux/constants/notifConstants";
import { baseUrl, authHeader, genericErrorMessage } from "@api/constants";
import * as types from "./attributeConstants";
import { User } from "@auth0/auth0-react";
import { SelectOptions } from "@customTypes/data";
const ATTRIBUTS = "attributs";

export const getAttributes = (user: User) => async (dispatch) => {
  dispatch({ type: types.GET_ATTRIBUTES_LOADING });
  const url = `${baseUrl}/${ATTRIBUTS}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const attributes = response.data;
    dispatch({ type: types.GET_ATTRIBUTES_SUCCESS, attributes });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_ATTRIBUTES_FAILED, message });
  }
};

export const postAttribute = (user: User) => async (dispatch) => {
  const url = `${baseUrl}/${ATTRIBUTS}`;
  const body = {};
  const header = authHeader(user);
  try {
    const response = await axios.post(url, body, header);
    const { id } = response.data;
    dispatch({ type: types.POST_ATTRIBUTE_SUCCESS, id });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.POST_ATTRIBUTE_FAILED, message });
  }
};

export const showAttribute = (user: User, id: string) => async (dispatch) => {
  const url = `${baseUrl}/${ATTRIBUTS}/${id}`;
  const header = authHeader(user);

  try {
    const response = await axios.get(url, header);
    const {
      label,
      description,
      type: valueType,
      selectionOptions,
      group,
    } = response.data;

    dispatch({
      type: types.SHOW_ATTRIBUTE_SUCCESS,
      label,
      description,
      valueType,
      selectionOptions: JSON.parse(selectionOptions),
      group,
    });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.SHOW_ATTRIBUTE_FAILED, message });
  }
};

export const putAttribute = (
  user: User,
  id: string,
  label: string,
  description: string,
  type: string,
  group: string,
  selectionOptions: SelectOptions
) => async (dispatch) => {
  const url = `${baseUrl}/${ATTRIBUTS}/${id}`;

  const body = {
    label,
    description,
    type,
    group,
    selectionOptions: type === "Selection" ? JSON.stringify(selectionOptions) : null,
  };

  const header = authHeader(user);

  try {
    await axios.put(url, body, header);
    const message = "Din attribut er opdateret";
    dispatch({ type: types.PUT_ATTRIBUTE_SUCCESS, message });
    dispatch(getAttributes(user));
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.PUT_ATTRIBUTE_FAILED, message });
  }
};

export const deleteAttribute = (user: User, id: string, title: string) => async (
  dispatch
) => {
  const url = `${baseUrl}/${ATTRIBUTS}/${id}`;
  const header = authHeader(user);

  try {
    await axios.delete(url, header);
    const message = `Du har slettet ${title}`;
    dispatch({ type: types.PUT_ATTRIBUTE_SUCCESS, message });
    dispatch(getAttributes(user));
  } catch (error) {
    let message = genericErrorMessage;
    // @ts-ignore
    if (error.response.status === 403) {
      message =
        "Hov det ser vist ud til, at du bruger dette kendetegn i arbejdsområder eller betingelser, derfor kan du ikke slette den.";
    }
    dispatch({ type: types.PUT_ATTRIBUTE_FAILED, message });
  }
};

export const getGroupDropDown = (user: User) => async (dispatch) => {
  const url = `${baseUrl}/groups/dropDownValues`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const groups = response.data;
    dispatch({ type: types.GET_GROUP_DROPDOWN_SUCCESS, groups });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_GROUP_DROPDOWN_FAILED, message });
  }
};

export const labelChange = (label) => ({
  type: types.LABEL_CHANGE,
  label,
});

export const changeCurrentAttribute = (id) => ({
  type: types.CURRENT_ATTRIBUTE,
  id,
});

export const descriptionChange = (description) => ({
  type: types.DESCRIPTION_CHANGE,
  description,
});

export const changeSelectionValues = (selectionOptions) => ({
  type: types.SELECTION_VALUES,
  selectionOptions,
});

export const addType = (value) => ({
  type: types.ADD_TYPE,
  value,
});

export const addGroup = (group) => ({
  type: types.ADD_GROUP,
  group,
});

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF,
};
