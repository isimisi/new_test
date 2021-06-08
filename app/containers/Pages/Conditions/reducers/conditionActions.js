/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import axios from 'axios';
import * as notification from '@redux/constants/notifConstants';
import { baseUrl, authHeader, genericErrorMessage } from '@api/constants';
import {
  isNode,
} from 'react-flow-renderer';
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
      label, description, group, elements
    } = response.data;

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

export const saveCondition = (condition_id, conditionZoom, conditionXPosition, conditionYPosition, nodes, history) => async dispatch => {
  const url = `${baseUrl}/${CONDITIONS}/${condition_id}/position`;
  const body = {
    conditionZoom, conditionXPosition, conditionYPosition, nodes
  };
  const header = authHeader();

  try {
    await axios.put(url, body, header);
    const message = 'Vi har gemt dit scenarie';
    dispatch({ type: types.SAVE_CONDITION_SUCCESS, message });
    history.push(`/app/${CONDITIONS}`);
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
    const message = `You have deleted ${title}`;
    dispatch({ type: types.DELETE_CONDITION_SUCCESS, message });
    dispatch(getConditions());
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.DELETE_CONDITION_FAILED, message });
  }
};

export const deleteConditionElement = (elementsToRemove, remainingElements) => async dispatch => {
  console.log(elementsToRemove);
  Promise.all(elementsToRemove.map(async (e) => {
    const url = `${baseUrl}/condition${isNode(e) ? 'Nodes' : 'Relationships'}/${e.id}`;
    const header = authHeader();
    await axios.delete(url, header);
  })).then(() => {
    dispatch({ type: types.DELETE_CONDITION_ELEMENTS_SUCCESS, remainingElements });
  }).catch((error) => {
    console.log(error.response);
    const message = genericErrorMessage;
    dispatch({ type: types.DELETE_CONDITION_ELEMENTS_FAILED, message });
  });
};

export const getNodes = () => async dispatch => {
  const url = `${baseUrl}/nodes/workspace`;
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

export const postNode = (condition_id, node_id, nodeLabel, values, setDefineNodeOpen) => async dispatch => {
  const url = `${baseUrl}/conditionNodes`;
  const body = {
    condition_id,
    node_id,
    nodeLabel,
    'x-value': 0,
    'y-value': 0,
    values,
  };
  const header = authHeader();

  try {
    const response = await axios.post(url, body, header);
    const node = response.data;
    dispatch({ type: types.CONDITION_POST_NODE_SUCCESS, node });
    setDefineNodeOpen(false);
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.CONDITION_POST_NODE_FAILED, message });
  }
};

export const putNode = (conditionNodeId, node_id, nodeLabel, nodeValues, deletedConditionValues, setDefineNodeOpen) => async dispatch => {
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
    setDefineNodeOpen(false);
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.CONDITION_PUT_NODE_FAILED, message });
  }
};

export const postEdge = (condition_id, edge, setDefineEdgeOpen) => async dispatch => {
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
    setDefineEdgeOpen(false);
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.CONDITION_POST_EDGE_FAILED, message });
  }
};

export const putEdge = (edgeId, relationship_id, relationshipLabel, comparison_type, comparison_value, type, setDefineEdgeOpen) => async dispatch => {
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
    setDefineEdgeOpen(false);
  } catch (error) {
    console.log(error.response);
    const message = genericErrorMessage;
    dispatch({ type: types.CONDITION_PUT_EDGE_FAILED, message });
  }
};

export const getRelationships = () => async dispatch => {
  const url = `${baseUrl}/relationships/workspace`;
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
  type: types.TITLE_CHANGE,
  title,
});

export const descriptionChange = description => ({
  type: types.DESCRIPTION_CHANGE,
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
