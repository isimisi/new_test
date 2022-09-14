/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import axios from "axios";
import * as notification from "@redux/constants/notifConstants";
import { baseUrl, authHeader, genericErrorMessage, validURL } from "@api/constants";
import * as types from "./outputConstants";
import { User } from "@auth0/auth0-react";
import { History } from "history";
const ACTIONS = "actions";

export const getOutput = (user: User) => async (dispatch) => {
  const url = `${baseUrl}/${ACTIONS}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const outputs = response.data;
    dispatch({ type: types.GET_OUTPUTS_SUCCESS, outputs });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_OUTPUTS_FAILED, message });
  }
};

export const postOutput = (user: User, history: History) => async (dispatch) => {
  const url = `${baseUrl}/${ACTIONS}`;
  const body = {};
  const header = authHeader(user);
  try {
    const response = await axios.post(url, body, header);
    const { id } = response.data;
    dispatch({ type: types.POST_OUTPUT_SUCCESS });
    history.push(`outputs/${id}`);
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.POST_OUTPUT_FAILED, message });
  }
};

export const showOutput = (user: User, id: string, setLoading) => async (dispatch) => {
  const url = `${baseUrl}/${ACTIONS}/${id}`;
  setLoading(true);
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const {
      label,
      description,
      output,
      conditions,
      group,
      file_type,
      output_type,
      tags,
    } = response.data;

    dispatch({
      type: types.SHOW_OUTPUT_SUCCESS,
      label,
      description,
      output,
      conditions,
      group,
      file_type,
      output_type,
      tags,
    });
    setLoading(false);
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.SHOW_OUTPUT_FAILED, message });
  }
};

export const putOutput = (
  user: User,
  id: string,
  label: string,
  description: string,
  output: any,
  outputType: string,
  group: string,
  conditions: string,
  deletedConditions: string,
  tags: string,
  history: History
) => async (dispatch) => {
  const url = `${baseUrl}/${ACTIONS}/${id}`;

  const header = authHeader(user);
  header.params = {
    label,
    description,
    outputType,
    group,
    conditions,
    deletedConditions,
    tags,
  };

  let body;
  if (!output.AcceptRanges && outputType === "upload") {
    header.params.hasFile = true;
    body = new FormData();
    body.append("file_content", output.file);
  }

  try {
    await axios.put(url, body, header);
    const message = "Dit indhold er blevet opdateret";
    dispatch({ type: types.PUT_OUTPUT_SUCCESS, message });
    history.push("/app/outputs");
  } catch (error) {
    const message = genericErrorMessage;

    dispatch({ type: types.PUT_OUTPUT_FAILED, message });
  }
};

export const deleteOutput = (user: User, id: string, title: string) => async (
  dispatch
) => {
  const url = `${baseUrl}/${ACTIONS}/${id}`;
  const header = authHeader(user);
  try {
    await axios.delete(url, header);
    const message = `Du har slettet ${title}`;
    dispatch({ type: types.DELETE_OUTPUT_SUCCESS, message });
    dispatch(getOutput(user));
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.DELETE_OUTPUT_FAILED, message });
  }
};

export const getConditionsDropDown = (user: User) => async (dispatch) => {
  const url = `${baseUrl}/conditions/dropDownValues`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const conditions = response.data;
    dispatch({ type: types.GET_CONDITION_DROPDOWN_SUCCESS, conditions });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_CONDITION_DROPDOWN_FAILED, message });
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

export const addCondition = (condition) => ({
  type: types.OUTPUT_ADD_CONDITION,
  condition,
});

export const changeCondition = (condition, index) => ({
  type: types.OUTPUT_CHANGE_CONDITION,
  condition,
  index,
});

export const deleteCondition = (index) => ({
  type: types.OUTPUT_DELETE_CONDITION,
  index,
});

export const titleChange = (title) => ({
  type: types.TITLE_CHANGE,
  title,
});

export const descriptionChange = (description) => ({
  type: types.DESCRIPTION_CHANGE,
  description,
});

export const editorStateChange = (editor) => ({
  type: types.EDITOR_STATE_CHANGE,
  editor,
});

export const addGroup = (group) => ({
  type: types.ADD_GROUP,
  group,
});

export const addOutput = (file) => ({
  type: types.ADD_OUTPUT,
  file,
});

export const changeTags = (tags) => ({
  type: types.CHANGE_TAGS,
  tags,
});

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF,
};

export const showNotifAction = (message) => ({
  type: notification.SHOW_NOTIF,
  message,
});
