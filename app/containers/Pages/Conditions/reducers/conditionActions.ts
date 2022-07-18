/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import axios from 'axios';
import * as notification from '@redux/constants/notifConstants';
import { baseUrl, authHeader, genericErrorMessage } from '@api/constants';
import {
  FlowElement,
  isNode,
} from 'react-flow-renderer';
import { changeCondition } from '../../Alerts/reducers/alertActions';
import { changeCondition as outputAddCondition } from '../../Outputs/reducers/outputActions';
import * as types from './conditionConstants';
import { User } from '@auth0/auth0-react';
import { History } from 'history';
import { ConditionEdgeData } from '@customTypes/reactFlow';
const CONDITIONS = 'conditions';

export const getConditions = (user: User) => async dispatch => {
  dispatch({ type: types.GET_CONDITIONS_LOADING });
  const url = `${baseUrl}/${CONDITIONS}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const conditions = response.data;
    dispatch({ type: types.GET_CONDITIONS_SUCCESS, conditions });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_CONDITIONS_FAILED, message });
  }
};

export const postCondition = (user: User, history: History, fromContent = false) => async dispatch => {
  const url = `${baseUrl}/${CONDITIONS}`;
  const body = {};
  const header = authHeader(user);
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

export const addElements = (user: User, id: string, elements: FlowElement[]) => async dispatch => {
  dispatch({ type: types.CONDITION_ADD_ELEMENTS, elements });
  const url = `${baseUrl}/${CONDITIONS}/addElements/${id}`;
  const body = { elements: JSON.stringify(elements) };
  const header = authHeader(user);
  try {
    const response = await axios.post(url, body, header);
    const { nodesWithOrgId, edgesWithOrgId } = response.data;
    dispatch({ type: types.CONDITION_UPDATE_ELEMENTS, nodesWithOrgId, edgesWithOrgId });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.POST_CONDITION_FAILED, message });
  }
};

export const showCondition = (user: User, id: string, setMetaOpen: React.Dispatch<React.SetStateAction<boolean>>) => async dispatch => {
  const url = `${baseUrl}/${CONDITIONS}/${id}`;
  const header = authHeader(user);

  try {
    const response = await axios.get(url, header);

    const {
      label, description, group, elements, tags
    } = response.data;


    if ((!label || label?.length === 0) && (!description || description?.length === 0) && !group) {
      setMetaOpen(true);
    }

    dispatch({
      type: types.SHOW_CONDITION_SUCCESS,
      label,
      description,
      group,
      elements,
      tags
    });
  } catch (error) {
    // @ts-ignore
    console.log(error.response);
    const message = genericErrorMessage;
    dispatch({ type: types.SHOW_CONDITION_FAILED, message });
  }
};

export const getBuildTypeValueOptions = (user: User, group: string) => async dispatch => {
  const url = `${baseUrl}/${CONDITIONS}/buildTypeOptions?group=${group}`;
  const header = authHeader(user);
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

export const putConditionMeta = (user: User, id: string, label: string, description: string, group: string, tags: string, setMetaOpen: React.Dispatch<React.SetStateAction<boolean>>) => async dispatch => {
  const url = `${baseUrl}/${CONDITIONS}/${id}`;
  const body = {
    label, description, group, tags
  };
  const header = authHeader(user);
  try {
    await axios.put(url, body, header);
    dispatch({ type: types.PUT_CONDITION_SUCCESS });
    setMetaOpen(false);
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.PUT_CONDITION_FAILED, message });
  }
};

export const saveCondition = (user: User, condition_id: string, conditionZoom: number,
  conditionXPosition: number, conditionYPosition: number,
  nodes: string, history: History, conditionLabel: string) => async dispatch => {
  const url = `${baseUrl}/${CONDITIONS}/${condition_id}/position`;
  const body = {
    conditionZoom, conditionXPosition, conditionYPosition, nodes
  };
  const header = authHeader(user);

  try {
    await axios.put(url, body, header);
    const message = 'Vi har gemt dit scenarie';
    // @ts-ignore
    if (history?.location?.state?.fromContent) {
      // @ts-ignore
      if (history.location.state.place === 'outputs') {
        dispatch(outputAddCondition({ id: condition_id, value: conditionLabel }, null));
      } else {
        dispatch(changeCondition({ id: condition_id, value: conditionLabel }, null));
      }
      // @ts-ignore
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

export const deleteCondition = (user: User, id: string, title: string) => async dispatch => {
  const url = `${baseUrl}/${CONDITIONS}/${id}`;
  const header = authHeader(user);
  try {
    await axios.delete(url, header);
    const message = `Du har slettet ${title}`;
    dispatch({ type: types.DELETE_CONDITION_SUCCESS, message });
    dispatch(getConditions(user));
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.DELETE_CONDITION_FAILED, message });
  }
};

export const deleteConditionElement = (user: User, elementsToRemove: FlowElement[], remainingElements: FlowElement[]) => async dispatch => {
  const message = genericErrorMessage;
  const header = authHeader(user);
  if (elementsToRemove.length === 1 && !isNode(elementsToRemove[0])) {
    const url = `${baseUrl}/conditionRelationships/${elementsToRemove[0].id}`;

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
    dispatch({ type: types.DELETE_CONDITION_ELEMENTS_SUCCESS, remainingElements });
    try {
      await axios.post(url, body, header);
    } catch (error) {
      dispatch({ type: types.DELETE_CONDITION_ELEMENTS_FAILED, message });
    }
  }
};

export const getNodes = (user: User, group: string) => async dispatch => {
  const url = `${baseUrl}/nodes/workspace?group=${group}&type=condition`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const nodes = response.data;
    dispatch({ type: types.GET_NODE_VALUES_SUCCESS, nodes });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_NODE_VALUES_FAILED, message });
  }
};

export const postNode = (user: User, condition_id: string, node_id: string,
  nodeLabel: string, values: string, x, y, close: () => void) => async dispatch => {
  const url = `${baseUrl}/conditionNodes`;
  const body = {
    condition_id,
    node_id,
    nodeLabel,
    'x-value': x,
    'y-value': y,
    values,
  };
  const header = authHeader(user);

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

export const putNode = (user: User, conditionNodeId: string, node_id: string, nodeLabel: string,
  nodeValues: string, deletedConditionValues: string, close: () => void) => async dispatch => {
  const url = `${baseUrl}/conditionNodes/${conditionNodeId}`;
  const body = {
    node_id,
    nodeLabel,
    nodeValues,
    deletedConditionValues
  };
  const header = authHeader(user);

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

export const postEdge = (user: User, condition_id: string, edge: ConditionEdgeData, close: () => void) => async dispatch => {
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
  const header = authHeader(user);

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

export const putEdge = (user: User, edgeId: string, relationship_id: string, relationshipLabel: string, comparison_type: string, comparison_value: string, type: string, close: () => void) => async dispatch => {
  const url = `${baseUrl}/conditionRelationships/${edgeId}`;
  const body = {
    relationship_id,
    relationshipLabel,
    comparison_type,
    comparison_value,
    type,
  };
  const header = authHeader(user);

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

export const getRelationships = (user: User, group: string) => async dispatch => {
  const url = `${baseUrl}/relationships/workspace?group=${group}&type=condition`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const relationships = response.data;
    dispatch({ type: types.GET_RELATIONSHIP_VALUES_SUCCESS, relationships });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_RELATIONSHIP_VALUES_FAILED, message });
  }
};


export const getGroupDropDown = (user) => async dispatch => {
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

export const changeTags = tags => ({
  type: types.CHANGE_TAGS,
  tags
});


export const closeNotifAction = {
  type: notification.CLOSE_NOTIF
};
