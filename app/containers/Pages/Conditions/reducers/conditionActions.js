/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import axios from 'axios';
import * as notification from '@redux/constants/notifConstants';
import { baseUrl, authHeader, genericErrorMessage } from '@api/constants';
import {
  isNode,
} from 'react-flow-renderer';
import { changeCondition } from '../../Alerts/reducers/alertActions';
import { changeCondition as outputAddCondition } from '../../Outputs/reducers/outputActions';
import * as types from './conditionConstants';
const CONDITIONS = 'conditions';

export const getConditions = () => async dispatch => {
  dispatch({ type: types.GET_CONDITIONS_LOADING });
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

export const postCondition = (history, fromContent = false) => async dispatch => {
  const url = `${baseUrl}/${CONDITIONS}`;
  const body = {};
  const header = authHeader();
  try {
    const response = await axios.post(url, body, header);
    const id = response.data;
    dispatch({ type: types.POST_CONDITION_SUCCESS });
    const place = history.location.pathname.split('/')[2];
    const placeId = history.location.pathname.split('/')[3];
    history.push(`/app/conditions/${id}`, { fromContent, place, placeId });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.POST_CONDITION_FAILED, message });
  }
};

export const showCondition = (id, setMetaOpen) => async dispatch => {
  const url = `${baseUrl}/${CONDITIONS}/${id}`;
  const header = authHeader();

  try {
    const response = await axios.get(url, header);

    const {
      label, description, group, elements
    } = response.data;


    if ((!label || label?.length === 0) && (!description || description?.length === 0) && !group) {
      setMetaOpen(true);
    }

    dispatch({
      type: types.SHOW_CONDITION_SUCCESS,
      label,
      description,
      group,
      elements
    });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.SHOW_CONDITION_FAILED, message });
  }
};

export const getBuildTypeValueOptions = (group) => async dispatch => {
  const url = `${baseUrl}/${CONDITIONS}/buildTypeOptions?group=${group}`;
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

export const putConditionMeta = (id, label, description, group, setMetaOpen) => async dispatch => {
  const url = `${baseUrl}/${CONDITIONS}/${id}`;
  const body = {
    label, description, group,
  };
  const header = authHeader();
  try {
    await axios.put(url, body, header);
    dispatch({ type: types.PUT_CONDITION_SUCCESS });
    setMetaOpen(false);
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.PUT_CONDITION_FAILED, message });
  }
};

export const saveCondition = (condition_id, conditionZoom, conditionXPosition, conditionYPosition, nodes, history, conditionLabel) => async dispatch => {
  const url = `${baseUrl}/${CONDITIONS}/${condition_id}/position`;
  const body = {
    conditionZoom, conditionXPosition, conditionYPosition, nodes
  };
  const header = authHeader();

  try {
    await axios.put(url, body, header);
    const message = 'Vi har gemt dit scenarie';

    if (history?.location?.state?.fromContent) {
      if (history.location.state.place === 'outputs') {
        dispatch(outputAddCondition({ id: condition_id, value: conditionLabel }, null));
      } else {
        dispatch(changeCondition({ id: condition_id, value: conditionLabel }, null));
      }

      history.push(`/app/${history.location.state.place}/${history.location.state.placeId}`, { fromCondition: true });
    } else {
      dispatch({ type: types.SAVE_CONDITION_SUCCESS, message });
      history.push(`/app/${CONDITIONS}`);
    }
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.SAVE_CONDITION_FAILED, message });
  }
};

export const deleteCondition = (id, title) => async dispatch => {
  const url = `${baseUrl}/${CONDITIONS}/${id}`;
  const header = authHeader();
  try {
    await axios.delete(url, header);
    const message = `Du har slettet ${title}`;
    dispatch({ type: types.DELETE_CONDITION_SUCCESS, message });
    dispatch(getConditions());
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.DELETE_CONDITION_FAILED, message });
  }
};

export const deleteConditionElement = (elementsToRemove, remainingElements) => async dispatch => {
  const message = genericErrorMessage;

  if (elementsToRemove.length === 1 && !isNode(elementsToRemove[0])) {
    const url = `${baseUrl}/conditionRelationships/${elementsToRemove[0].id}`;
    const header = authHeader();
    try {
      await axios.delete(url, header);
      dispatch({ type: types.DELETE_CONDITION_ELEMENTS_SUCCESS, remainingElements });
    } catch (error) {
      dispatch({ type: types.DELETE_CONDITION_ELEMENTS_FAILED, message });
    }
  } else {
    const url = `${baseUrl}/${CONDITIONS}/elements`;
    const elements = elementsToRemove.filter(element => isNode(element)).map(element => element.id);
    const body = { elements };
    const header = authHeader();
    dispatch({ type: types.DELETE_CONDITION_ELEMENTS_SUCCESS, remainingElements });
    try {
      await axios.post(url, body, header);
    } catch (error) {
      dispatch({ type: types.DELETE_CONDITION_ELEMENTS_FAILED, message });
    }
  }
};

export const getNodes = (group) => async dispatch => {
  const url = `${baseUrl}/nodes/workspace?group=${group}&type=condition`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const nodes = response.data;
    dispatch({ type: types.GET_NODE_VALUES_SUCCESS, nodes });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_NODE_VALUES_FAILED, message });
  }
};

export const postNode = (condition_id, node_id, nodeLabel, values, x, y, close) => async dispatch => {
  const url = `${baseUrl}/conditionNodes`;
  const body = {
    condition_id,
    node_id,
    nodeLabel,
    'x-value': x,
    'y-value': y,
    values,
  };
  const header = authHeader();

  try {
    const response = await axios.post(url, body, header);
    const node = response.data;
    dispatch({ type: types.CONDITION_POST_NODE_SUCCESS, node });
    close();
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.CONDITION_POST_NODE_FAILED, message });
  }
};

export const putNode = (conditionNodeId, node_id, nodeLabel, nodeValues, deletedConditionValues, close) => async dispatch => {
  const url = `${baseUrl}/conditionNodes/${conditionNodeId}`;
  const body = {
    node_id,
    nodeLabel,
    nodeValues,
    deletedConditionValues
  };
  const header = authHeader();

  try {
    const response = await axios.put(url, body, header);
    const node = response.data;
    dispatch({ type: types.CONDITION_PUT_NODE_SUCCESS, node });
    close();
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.CONDITION_PUT_NODE_FAILED, message });
  }
};

export const postEdge = (condition_id, edge, close) => async dispatch => {
  const url = `${baseUrl}/conditionRelationships`;
  const body = {
    condition_id,
    source_id: edge.source,
    target_id: edge.target,
    source_handle: edge.sourceHandle,
    target_handle: edge.targetHandle,
    relationship_id: edge.relationship_id,
    relationshipLabel: edge.relationshipLabel,
    comparison_type: edge.comparisonType,
    comparison_value: edge.comparisonValue,
    type: edge.relationshipType,
  };
  const header = authHeader();

  try {
    const response = await axios.post(url, body, header);
    const responseEdge = response.data;
    dispatch({ type: types.CONDITION_POST_EDGE_SUCCESS, edge: responseEdge });
    close();
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.CONDITION_POST_EDGE_FAILED, message });
  }
};

export const putEdge = (edgeId, relationship_id, relationshipLabel, comparison_type, comparison_value, type, close) => async dispatch => {
  const url = `${baseUrl}/conditionRelationships/${edgeId}`;
  const body = {
    relationship_id,
    relationshipLabel,
    comparison_type,
    comparison_value,
    type,
  };
  const header = authHeader();

  try {
    const response = await axios.put(url, body, header);
    const edge = response.data;
    dispatch({ type: types.CONDITION_PUT_EDGE_SUCCESS, edge });
    close();
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.CONDITION_PUT_EDGE_FAILED, message });
  }
};

export const getRelationships = (group) => async dispatch => {
  const url = `${baseUrl}/relationships/workspace?group=${group}&type=condition`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const relationships = response.data;
    dispatch({ type: types.GET_RELATIONSHIP_VALUES_SUCCESS, relationships });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_RELATIONSHIP_VALUES_FAILED, message });
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
  type: types.TITLE_CHANGE_CONDITION,
  title,
});

export const descriptionChange = description => ({
  type: types.DESCRIPTION_CHANGE_CONDITION,
  description,
});

export const addGroup = group => ({
  type: types.ADD_GROUP,
  group
});

export const addRelationshipToList = relationship => ({
  type: types.CONDITION_RELATIONSHIP_ADD_TO_LIST,
  relationship
});

export const addNodeToList = node => ({
  type: types.CONDITION_NODE_ADD_TO_LIST,
  node
});

export const addAttributToList = attribut => ({
  type: types.CONDITION_NODE_ATTRIBUT_ADD_TO_LIST,
  attribut
});

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF
};
