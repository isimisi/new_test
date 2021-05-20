/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import axios from 'axios';
import * as notification from '@redux/constants/notifConstants';
import { baseUrl, authHeader, genericErrorMessage } from '@api/constants';
import * as types from './conditionConstants';
const CONDITIONS = 'conditions';

export const getConditions = () => async dispatch => {
  const url = `${baseUrl}/${CONDITIONS}`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const conditions = response.data;
    dispatch({ type: types.GET_CONDITIONS_SUCCESS, conditions });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_CONDITIONS_FAILED, message });
  }
};

export const postCondition = (history) => async dispatch => {
  const url = `${baseUrl}/${CONDITIONS}`;
  const body = {};
  const header = authHeader();
  try {
    const response = await axios.post(url, body, header);
    const { id } = response.data;
    dispatch({ type: types.POST_CONDITION_SUCCESS });
    history.push(`conditions/${id}`);
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.POST_CONDITION_FAILED, message });
  }
};

export const showCondition = (id) => async dispatch => {
  const url = `${baseUrl}/${CONDITIONS}/${id}`;
  const header = authHeader();

  try {
    const response = await axios.get(url, header);
    const {
      title, description, group, type: conditionType, values
    } = response.data;

    const emptyConditionValue = {
      build_type: null,
      build_value: null,
      comparison_type: 'is equal to',
      comparison_value: ''
    };
    values.push(emptyConditionValue);
    dispatch({
      type: types.SHOW_CONDITION_SUCCESS,
      title,
      description,
      group,
      conditionType,
      values
    });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.SHOW_CONDITION_FAILED, message });
  }
};

export const getBuildTypeValueOptions = () => async dispatch => {
  const url = `${baseUrl}/${CONDITIONS}/buildTypeOptions`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const buildTypeOptions = response.data;
    const {
      nodeAttributes, relationshipLabels
    } = buildTypeOptions;
    dispatch({
      type: types.GET_BUILD_TYPES_VALUES_SUCCESS,
      nodeAttributes,
      relationshipLabels
    });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_BUILD_TYPES_VALUES_FAILED, message });
  }
};

export const putCondition = (id, title, description, type, group, conditionValues, history) => async dispatch => {
  const url = `${baseUrl}/${CONDITIONS}/${id}`;
  const body = {
    title, description, type, group, conditionValues
  };
  const header = authHeader();
  try {
    await axios.put(url, body, header);
    const message = 'You have updated your node';
    dispatch({ type: types.PUT_CONDITION_SUCCESS, message });
    history.push('/app/conditions');
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.PUT_CONDITION_FAILED, message });
  }
};

export const deleteCondition = (id, title) => async dispatch => {
  const url = `${baseUrl}/${CONDITIONS}/${id}`;
  const header = authHeader();
  try {
    await axios.delete(url, header);
    const message = `You have deleted ${title}`;
    dispatch({ type: types.DELETE_CONDITION_SUCCESS, message });
    dispatch(getConditions());
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.DELETE_CONDITION_FAILED, message });
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

export const addType = value => ({
  type: types.ADD_TYPE,
  value
});

export const addGroup = group => ({
  type: types.ADD_GROUP,
  group
});

export const changeConditionValue = condition => ({
  type: types.CHANGE_CONDITION_ROW,
  condition
});

export const addConditionValue = () => ({
  type: types.ADD_CONDITION_ROW
});

export const deleteConditionValue = (index) => ({
  type: types.DELETE_CONDITION_ROW,
  index
});

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF
};
