/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import axios from 'axios';
import * as notification from '@redux/constants/notifConstants';
import { baseUrl, authHeader, genericErrorMessage as message } from '@api/constants';
import {
  isNode,
} from 'react-flow-renderer';
import * as types from './workspaceConstants';

const WORKSPACES = 'workspaces';

export const getWorkspaces = () => async dispatch => {
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


export const showWorkspace = (id) => async dispatch => {
  const url = `${baseUrl}/${WORKSPACES}/${id}`;
  const header = authHeader();

  try {
    const response = await axios.get(url, header);
    const {
      elements, label, description, group, zoom, x_position, y_position
    } = response.data;
    dispatch({
      type: types.SHOW_WORKSPACE_SUCCESS, label, description, group, elements, zoom, x_position, y_position
    });
  } catch (error) {
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


export const saveWorkspace = (workspace_id, workspaceZoom, workspaceXPosition, workspaceYPosition, nodes, history) => async dispatch => {
  const url = `${baseUrl}/${WORKSPACES}/${workspace_id}/position`;
  const body = {
    workspaceZoom, workspaceXPosition, workspaceYPosition, nodes
  };
  const header = authHeader();

  try {
    await axios.put(url, body, header);
    dispatch({ type: types.SAVE_WORKSPACE_SUCCESS });
    history.push(`/app/${WORKSPACES}`);
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
  Promise.all(elementsToRemove.map(async (e) => {
    const url = `${baseUrl}/${WORKSPACES}/${isNode(e) ? 'nodes' : 'relationship'}/${e.id}`;
    const header = authHeader();
    await axios.delete(url, header);
  })).then(() => {
    dispatch({ type: types.DELETE_WORKSPACE_ELEMENTS_SUCCESS, remainingElements });
  }).catch(() => {
    dispatch({ type: types.DELETE_WORKSPACE_ELEMENTS_FAILED, message });
  });
};

export const postNode = (workspace_id, node_id, display_name, backgroundColor, borderColor, setDefineNodeOpen) => async dispatch => {
  const url = `${baseUrl}/${WORKSPACES}/nodes`;
  const body = {
    workspace_id,
    node_id,
    display_name,
    backgroundColor,
    borderColor,
    'x-value': 0,
    'y-value': 0
  };
  const header = authHeader();

  try {
    const response = await axios.post(url, body, header);
    const node = response.data;
    dispatch({ type: types.POST_NODE_SUCCESS, node });
    setDefineNodeOpen(false);
  } catch (error) {
    dispatch({ type: types.POST_NODE_FAILED, message });
  }
};

export const putNode = (workspaceNodeId, node_id, display_name, backgroundColor, borderColor, setDefineNodeOpen) => async dispatch => {
  const url = `${baseUrl}/${WORKSPACES}/nodes/${workspaceNodeId}`;
  const body = {
    node_id,
    display_name,
    backgroundColor,
    borderColor,
  };
  const header = authHeader();

  try {
    const response = await axios.put(url, body, header);
    const node = response.data;
    dispatch({ type: types.PUT_NODE_SUCCESS, node });
    setDefineNodeOpen(false);
  } catch (error) {
    dispatch({ type: types.PUT_NODE_FAILED, message });
  }
};


export const postEdge = (workspace_id, edge, setDefineEdgeOpen) => async dispatch => {
  const url = `${baseUrl}/${WORKSPACES}/relationship`;
  const body = {
    workspace_id,
    source_id: edge.source,
    target_id: edge.target,
    source_handle: edge.sourceHandle,
    target_handle: edge.targetHandle,
    relationship_id: edge.relationship_id,
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
  } catch (error) {
    dispatch({ type: types.POST_EDGE_FAILED, message });
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

export const addEdge = edge => ({
  type: types.ADD_EDGE,
  edge,
});

export const changeHandleVisability = bool => ({
  type: types.SHOW_HANDLES_CHANGE,
  bool,
});

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF
};
