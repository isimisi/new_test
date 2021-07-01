/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import axios from 'axios';
import * as notification from '@redux/constants/notifConstants';
import { baseUrl, authHeader, genericErrorMessage as message } from '@api/constants';
import {
  isNode,
} from 'react-flow-renderer';
import _history from '@utils/history';
import * as types from './workspaceConstants';
import { getLayoutedElements } from '../constants';


const WORKSPACES = 'workspaces';

export const getWorkspaces = () => async dispatch => {
  dispatch({ type: types.GET_WORKSPACES_LOADING });
  const url = `${baseUrl}/${WORKSPACES}`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const workspaces = response.data;
    dispatch({ type: types.GET_WORKSPACES_SUCCESS, workspaces });
  } catch (error) {
    dispatch({ type: types.GET_WORKSPACES_FAILED, message });
  }
};

export const cvrWorkspace = (id, cvr, close, erstTypes) => async dispatch => {
  dispatch({ type: types.GET_CVR_NODES_LOADING });
  const url = `${baseUrl}/workspaces/${id}/cvr`;
  const body = { cvr, erstTypes };
  const header = authHeader();
  try {
    const response = await axios.post(url, body, header);
    const elements = getLayoutedElements(response.data);

    dispatch({ type: types.GET_CVR_NODES_SUCCESS, elements });
    close();
  } catch (error) {
    const _message = 'Vi har desværre nogle probler med kommunkationen til cvr';
    dispatch({ type: types.GET_CVR_NODES_FAILED, message: _message });
  }
};


export const analyseAlerts = (workspaceId, setAlerts, initial = false) => async () => {
  const url = `${baseUrl}/${WORKSPACES}/analyse/alerts/${workspaceId}`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const alerts = response.data;
    setAlerts(alerts, initial);
  } catch (error) {
    // do something
  }
};

export const analyseOutput = (workspaceId) => async dispatch => {
  const url = `${baseUrl}/${WORKSPACES}/analyse/actions/${workspaceId}`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const outputs = response.data;
    dispatch({ type: types.ANALYSE_OUTPUT_SUCCESS, outputs });
  } catch (error) {
    dispatch({ type: types.ANALYSE_OUTPUT_FAILED, message });
  }
};

export const postWorkspace = (history) => async dispatch => {
  const url = `${baseUrl}/${WORKSPACES}`;
  const body = {};
  const header = authHeader();

  try {
    const response = await axios.post(url, body, header);
    const { id } = response.data;
    dispatch({ type: types.POST_WORKSPACE_SUCCESS });
    history.push(`${WORKSPACES}/${id}`);
  } catch (error) {
    dispatch({ type: types.POST_WORKSPACE_FAILED, message });
  }
};


export const showWorkspace = (id, setMetaOpen, setAlerts) => async dispatch => {
  const url = `${baseUrl}/${WORKSPACES}/${id}`;
  const header = authHeader();

  try {
    const response = await axios.get(url, header);
    const {
      elements, label, description, group, zoom, x_position, y_position
    } = response.data;
    console.log(elements);
    dispatch({
      type: types.SHOW_WORKSPACE_SUCCESS, label, description, group, elements, zoom, x_position, y_position
    });


    if ((!label || label?.length === 0) && (!description || description?.length === 0) && !group) {
      setMetaOpen(true);
    }
    dispatch(analyseAlerts(id, setAlerts, true));
  } catch (error) {
    if (error?.response?.status === 403) {
      _history.replace('/app/not-found');
    }

    dispatch({ type: types.SHOW_WORKSPACE_FAILED, message });
  }
};


export const putWorkspace = (workspace_id, label, description, group, setMetaOpen) => async dispatch => {
  const url = `${baseUrl}/${WORKSPACES}/${workspace_id}`;
  const body = {
    label, description, group
  };
  const header = authHeader();

  try {
    await axios.put(url, body, header);
    const _message = 'Metatekst er nu opdateret';
    dispatch({ type: types.PUT_WORKSPACE_SUCCESS, message: _message });
    setMetaOpen(false);
  } catch (error) {
    dispatch({ type: types.PUT_WORKSPACE_FAILED, message });
  }
};


export const saveWorkspace = (workspace_id, workspaceZoom, workspaceXPosition, workspaceYPosition, nodes) => async dispatch => {
  const url = `${baseUrl}/${WORKSPACES}/${workspace_id}/position`;
  const body = {
    workspaceZoom, workspaceXPosition, workspaceYPosition, nodes
  };
  const header = authHeader();
  try {
    await axios.put(url, body, header);
    dispatch({ type: types.SAVE_WORKSPACE_SUCCESS });
  } catch (error) {
    dispatch({ type: types.SAVE_WORKSPACE_FAILED, message });
  }
};

export const deleteWorkspaces = (id, title) => async dispatch => {
  const url = `${baseUrl}/${WORKSPACES}/${id}`;
  const header = authHeader();
  try {
    await axios.delete(url, header);
    const _message = `You have deleted ${title}`;
    dispatch({ type: types.DELETE_WORKSPACE_SUCCESS, message: _message });
    dispatch(getWorkspaces());
  } catch (error) {
    dispatch({ type: types.DELETE_WORKSPACE_FAILED, message });
  }
};

export const deleteWorkspaceElement = (elementsToRemove, remainingElements) => async dispatch => {
  if (elementsToRemove.length === 1 && !isNode(elementsToRemove[0])) {
    const url = `${baseUrl}/${WORKSPACES}/relationship/${elementsToRemove[0].id}`;
    const header = authHeader();
    try {
      await axios.delete(url, header);
      dispatch({ type: types.DELETE_WORKSPACE_ELEMENTS_SUCCESS, remainingElements });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: types.DELETE_WORKSPACE_ELEMENTS_FAILED, message });
    }
  } else {
    const url = `${baseUrl}/${WORKSPACES}/elements`;
    const elements = elementsToRemove.filter(element => isNode(element)).map(element => element.id);
    const body = { elements };
    const header = authHeader();
    try {
      await axios.post(url, body, header);
      dispatch({ type: types.DELETE_WORKSPACE_ELEMENTS_SUCCESS, remainingElements });
    } catch (error) {
      dispatch({ type: types.DELETE_WORKSPACE_ELEMENTS_FAILED, message });
    }
  }
};

export const postNode = (workspace_id, node_id, nodeLabel, display_name, figur, background_color, border_color, attributes, setDefineNodeOpen, setAlerts, x, y) => async dispatch => {
  dispatch({ type: types.WORKSPACE_POST_NODE_LOADING });
  const url = `${baseUrl}/${WORKSPACES}/nodes`;
  const body = {
    workspace_id,
    node_id,
    nodeLabel,
    display_name,
    figur,
    background_color,
    border_color,
    attributes,
    'x-value': x,
    'y-value': y
  };
  const header = authHeader();

  try {
    const response = await axios.post(url, body, header);
    const node = response.data;
    dispatch({ type: types.WORKSPACE_POST_NODE_SUCCESS, node });
    setDefineNodeOpen(false);
    dispatch(analyseAlerts(workspace_id, setAlerts));
  } catch (error) {
    dispatch({ type: types.WORKSPACE_POST_NODE_FAILED, message });
  }
};

export const putNode = (workspaceNodeId, node_id, nodeLabel, display_name, figur, backgroundColor, borderColor, attributes, deletedAttributes, setDefineNodeOpen) => async dispatch => {
  dispatch({ type: types.WORKSPACE_PUT_NODE_LOADING });
  const url = `${baseUrl}/${WORKSPACES}/nodes/${workspaceNodeId}`;
  const body = {
    node_id,
    nodeLabel,
    display_name,
    figur,
    backgroundColor,
    borderColor,
    attributes,
    deletedAttributes,
  };
  const header = authHeader();
  try {
    const response = await axios.put(url, body, header);
    const node = response.data;
    dispatch({ type: types.WORKSPACE_PUT_NODE_SUCCESS, node });
    setDefineNodeOpen(false);
  } catch (error) {
    dispatch({ type: types.WORKSPACE_PUT_NODE_FAILED, message });
  }
};


export const postEdge = (workspace_id, edge, setDefineEdgeOpen, setAlert) => async dispatch => {
  dispatch({ type: types.POST_EDGE_LOADING });
  const url = `${baseUrl}/${WORKSPACES}/relationship`;
  const body = {
    workspace_id,
    source_id: edge.source,
    target_id: edge.target,
    source_handle: edge.sourceHandle,
    target_handle: edge.targetHandle,
    relationship_id: edge.relationship_id,
    relationshipLabel: edge.relationshipLabel,
    relationship_value: edge.relationshipValue,
    color: JSON.stringify(edge.relationshipColor),
    type: edge.relationshipType,
    arrow: edge.showArrow,
    animated: edge.animatedLine,
    show_label: edge.showLabel,
  };
  const header = authHeader();

  try {
    const response = await axios.post(url, body, header);
    const responseEdge = response.data;
    dispatch({ type: types.POST_EDGE_SUCCESS, edge: responseEdge });
    setDefineEdgeOpen(false);
    dispatch(analyseAlerts(workspace_id, setAlert));
  } catch (error) {
    dispatch({ type: types.POST_EDGE_FAILED, message });
  }
};

export const putEdge = (
  edgeId,
  relationship_id,
  relationshipLabel,
  relationshipValue,
  relationshipColor,
  relationshipType,
  showArrow,
  animatedLine,
  showLabel,
  setDefineEdgeOpen
) => async dispatch => {
  dispatch({ type: types.PUT_EDGE_LOADING });
  const url = `${baseUrl}/${WORKSPACES}/relationship/${edgeId}`;
  const body = {
    relationship_id,
    relationshipLabel,
    relationship_value: relationshipValue,
    color: JSON.stringify(relationshipColor),
    type: relationshipType,
    arrow: showArrow,
    animated: animatedLine,
    show_label: showLabel,
  };
  const header = authHeader();

  try {
    const response = await axios.put(url, body, header);
    const responseEdge = response.data;
    dispatch({ type: types.PUT_EDGE_SUCCESS, edge: responseEdge });
    setDefineEdgeOpen(false);
  } catch (error) {
    dispatch({ type: types.PUT_EDGE_FAILED, message });
  }
};

export const getNodes = () => async dispatch => {
  const url = `${baseUrl}/nodes/workspace`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const nodes = response.data;
    dispatch({ type: types.GET_NODE_VALUES_SUCCESS, nodes });
  } catch (error) {
    dispatch({ type: types.GET_NODE_VALUES_FAILED, message });
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
    dispatch({ type: types.GET_GROUP_DROPDOWN_FAILED, message });
  }
};

export const getAttributeDropDown = () => async dispatch => {
  const url = `${baseUrl}/attributs/dropDownValues`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const attributes = response.data;
    dispatch({ type: types.GET_ATTRIBUTE_DROPDOWN_SUCCESS, attributes });
  } catch (error) {
    dispatch({ type: types.GET_ATTRIBUTE_DROPDOWN_FAILED, message });
  }
};

export const postSticky = (workspace_id, x, y) => async dispatch => {
  const url = `${baseUrl}/workspaces/sticky`;
  const body = {
    workspace_id,
    'x-value': x,
    'y-value': y
  };
  const header = authHeader();
  try {
    const response = await axios.post(url, body, header);
    const node = response.data;
    dispatch({ type: types.WORKSPACE_POST_NODE_SUCCESS, node });
  } catch (error) {
    console.log(error);
    dispatch({ type: types.WORKSPACE_POST_NODE_FAILED, message });
  }
};

// eslint-disable-next-line no-unused-vars
export const putSticky = (id, text) => async dispatch => {
  const url = `${baseUrl}/workspaces/sticky/${id}`;
  const body = {
    text,
  };
  const header = authHeader();
  try {
    await axios.put(url, body, header);
  } catch (error) {
    console.log(error);
    // do something
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

export const addGroup = group => ({
  type: types.ADD_GROUP,
  group
});

export const addEdgeToList = edge => ({
  type: types.EDGE_ADD_TO_LIST,
  edge,
});

export const addWorkspaceNodeToList = node => ({
  type: types.WORKSPACE_NODE_ADD_TO_LIST,
  node,
});

export const addWorkspaceNodeAttributToList = attribut => ({
  type: types.WORKSPACE_NODE_ATTRIBUT_ADD_TO_LIST,
  attribut,
});

export const changeHandleVisability = bool => ({
  type: types.SHOW_HANDLES_CHANGE,
  bool,
});

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF
};
