/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import axios from 'axios';
import * as notification from '@redux/constants/notifConstants';
import {
  baseUrl, authHeader, genericErrorMessage, validURL
} from '@api/constants';
import * as types from './outputConstants';
const ACTIONS = 'actions';

export const getOutput = () => async dispatch => {
  const url = `${baseUrl}/${ACTIONS}`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const outputs = response.data;
    dispatch({ type: types.GET_OUTPUTS_SUCCESS, outputs });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_OUTPUTS_FAILED, message });
  }
};

export const postOutput = (history) => async dispatch => {
  const url = `${baseUrl}/${ACTIONS}`;
  const body = {};
  const header = authHeader();
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

export const showOutput = (id) => async dispatch => {
  const url = `${baseUrl}/${ACTIONS}/${id}`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const {
      label, description, output, condition, group, file_type, output_type
    } = response.data;
    // TODO: handle drafts
    // const draftAgait = htmlToDraft(html);
    // const { contentBlocks, entityMap } = draftAgait;
    // const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    // const editorState = EditorState.createWithContent(contentState);

    dispatch({
      type: types.SHOW_OUTPUT_SUCCESS, label, description, output, condition, group, file_type, output_type
    });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.SHOW_OUTPUT_FAILED, message });
  }
};

export const putOutput = (id, label, description, output, fileType, outputType, condition, group) => async dispatch => {
  const url = `${baseUrl}/${ACTIONS}/${id}`;
  const header = authHeader();
  header.params = {
    label, description, fileType, outputType, condition, group
  };

  let body;
  if (validURL(output)) {
    header.params.output = output;
  } else {
    body = new FormData();
    body.append('file_content', output);
  }

  try {
    await axios.put(url, body, header);
    const message = 'Your output has been updated';
    dispatch({ type: types.PUT_OUTPUT_SUCCESS, message });
  } catch (error) {
    const message = genericErrorMessage;

    dispatch({ type: types.PUT_OUTPUT_FAILED, message });
  }
};

export const deleteOutput = (id, title) => async dispatch => {
  const url = `${baseUrl}/${ACTIONS}/${id}`;
  const header = authHeader();
  try {
    await axios.delete(url, header);
    const message = `Du har slettet ${title}`;
    dispatch({ type: types.DELETE_OUTPUT_SUCCESS, message });
    dispatch(getOutput());
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.DELETE_OUTPUT_FAILED, message });
  }
};

export const getConditionsDropDown = () => async dispatch => {
  const url = `${baseUrl}/conditions/dropDownValues`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const conditions = response.data;
    dispatch({ type: types.GET_CONDITION_DROPDOWN_SUCCESS, conditions });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_CONDITION_DROPDOWN_FAILED, message });
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

export const fileTypeChange = fileType => ({
  type: types.FILE_TYPE_CHANGE,
  fileType,
});

export const editorStateChange = editor => ({
  type: types.EDITOR_STATE_CHANGE,
  editor,
});

export const addGroup = group => ({
  type: types.ADD_GROUP,
  group
});

export const addCondition = condition => ({
  type: types.ADD_CONDITION,
  condition
});

export const addOutput = (file) => ({
  type: types.ADD_OUTPUT,
  file,
});

export const addOutputUrl = (url) => ({
  type: types.ADD_OUTPUT_URL,
  url,
});

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF
};

export const showNotifAction = message => ({
  type: notification.SHOW_NOTIF,
  message
});
