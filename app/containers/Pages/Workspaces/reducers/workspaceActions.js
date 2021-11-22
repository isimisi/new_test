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
import { saveToLocalStorage } from '@utils/localStorage';
import LogRocket from 'logrocket';
import { toast } from 'react-toastify';
import * as types from './workspaceConstants';

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
    await axios.post(url, body, header);
  } catch (error) {
    let _message = 'Vi har desværre nogle problemer med kommunkationen til CVR';

    if (error?.response?.status === 503) {
      _message = 'Du skal være på et Draw plan for at trække selskaber med over 100 elementer';
    }
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

    dispatch({ type: types.POST_WORKSPACE_SUCCESS });
    history.push(`/app/${WORKSPACES}/${response.data}`);
  } catch (error) {
    dispatch({ type: types.POST_WORKSPACE_FAILED, message });
  }
};


export const showWorkspace = (id, setMetaOpen = null, setAlerts = null) => async dispatch => {
  const url = `${baseUrl}/${WORKSPACES}/${id}`;
  dispatch({ type: types.SHOW_WORKSPACE_LOADING });

  const header = authHeader();

  try {
    const response = await axios.get(url, header);
    const {
      elements, label, description, group, zoom, x_position, y_position, signed, signed_by, tags
    } = response.data;

    dispatch({
      type: types.SHOW_WORKSPACE_SUCCESS, label, description, group, elements, zoom, x_position, y_position, signed, signed_by, tags
    });


    if ((!label || label?.length === 0) && (!description || description?.length === 0) && !group) {
      setMetaOpen && setMetaOpen(true);
    }
    setAlerts && dispatch(analyseAlerts(id, setAlerts, true));
  } catch (error) {
    if (error?.response?.status === 403) {
      _history.replace('/app/not-found');
    } else {
      dispatch({ type: types.SHOW_WORKSPACE_FAILED, message });
    }
  }
};


export const putWorkspace = (workspace_id, label, description, group, tags, shareOrg, setMetaOpen) => async dispatch => {
  const url = `${baseUrl}/${WORKSPACES}/${workspace_id}`;
  const body = {
    label, description, group, shareOrg, tags
  };
  const header = authHeader();

  try {
    await axios.put(url, body, header);
    const _message = 'Metatekst er nu opdateret';
    dispatch({ type: types.PUT_WORKSPACE_SUCCESS, message: _message });

    setMetaOpen(false);

    setTimeout(() => {
      // eslint-disable-next-line no-use-before-define
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      dispatch(changeStepIndex(2));
    }, 100);
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
    const _message = `Du har slettet ${title}`;
    dispatch({ type: types.DELETE_WORKSPACE_SUCCESS, message: _message });
    dispatch(getWorkspaces());
  } catch (error) {
    let _message = message;
    if (error?.response?.status === 403) {
      _message = error.response.data;
    }
    if (!id) {
      _message = 'Du kan ikke slette arbejdsområder, som er udløbet.';
    }
    dispatch({ type: types.DELETE_WORKSPACE_FAILED, message: _message });
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
      dispatch({ type: types.DELETE_WORKSPACE_ELEMENTS_FAILED, message });
    }
  } else {
    const url = `${baseUrl}/${WORKSPACES}/elements`;
    const elements = elementsToRemove.filter(element => isNode(element)).map(element => element.id);
    const body = { elements };
    const header = authHeader();

    dispatch({ type: types.DELETE_WORKSPACE_ELEMENTS_SUCCESS, remainingElements });
    try {
      await axios.post(url, body, header);
    } catch (error) {
      dispatch({ type: types.DELETE_WORKSPACE_ELEMENTS_FAILED, message });
    }
  }
};

export const postNode = (workspace_id, node_id, nodeLabel, display_name, figur, background_color, border_color, attributes, close, setAlerts, x, y) => async dispatch => {
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
    close();
    setAlerts && dispatch(analyseAlerts(workspace_id, setAlerts));
  } catch (error) {
    dispatch({ type: types.WORKSPACE_POST_NODE_FAILED, message });
  }
};

export const putNode = (workspaceNodeId, node_id, nodeLabel, display_name, figur, backgroundColor, borderColor, attributes, deletedAttributes, close) => async dispatch => {
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
    close();
  } catch (error) {
    dispatch({ type: types.WORKSPACE_PUT_NODE_FAILED, message });
  }
};


export const postEdge = (workspace_id, edge, close, setAlert) => async dispatch => {
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
    line_through: edge.lineThrough
  };
  const header = authHeader();

  try {
    const response = await axios.post(url, body, header);
    const responseEdge = response.data;
    dispatch({ type: types.POST_EDGE_SUCCESS, edge: responseEdge });
    close();
    setAlert && dispatch(analyseAlerts(workspace_id, setAlert));
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
  lineThrough,
  close
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
    line_through: lineThrough
  };
  const header = authHeader();

  try {
    const response = await axios.put(url, body, header);
    const responseEdge = response.data;

    dispatch({ type: types.PUT_EDGE_SUCCESS, edge: responseEdge });
    close();
  } catch (error) {
    dispatch({ type: types.PUT_EDGE_FAILED, message });
  }
};

export const getNodes = (group) => async dispatch => {
  const url = `${baseUrl}/nodes/workspace?group=${group}`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);
    const nodes = response.data.filter(n => n.label !== '*');
    dispatch({ type: types.GET_NODE_VALUES_SUCCESS, nodes });
  } catch (error) {
    dispatch({ type: types.GET_NODE_VALUES_FAILED, message });
  }
};

export const getRelationships = (group) => async dispatch => {
  const url = `${baseUrl}/relationships/workspace?group=${group}`;
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

export const getAttributeDropDown = (group) => async dispatch => {
  const url = `${baseUrl}/attributs/dropDownValues?group=${group}`;
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
    dispatch({ type: types.WORKSPACE_POST_NODE_FAILED, message });
  }
};

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const putSticky = (id, text) => async dispatch => {
  const url = `${baseUrl}/workspaces/sticky/${id}`;
  const body = {
    text,
  };
  const header = authHeader();
  try {
    await axios.put(url, body, header);
  } catch (error) {

    // do something
  }
};

export const getCompanyData = (id) => async dispatch => {
  dispatch({ type: types.GET_WORKSPACE_NODE_COMPANY_DATA_LOADING });
  const url = `${baseUrl}/workspacenodes/company/info/${id}`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);

    const companyData = response.data;
    console.log(companyData);
    dispatch({ type: types.GET_WORKSPACE_NODE_COMPANY_DATA_SUCCESS, companyData });

    dispatch({ type: types.SET_SHOW_COMPANY_DATA, show: true });
  } catch (error) {
    let _message = message;
    if (error?.response?.status === 403) {
      _message = error.response.data;
    }
    dispatch({ type: types.GET_WORKSPACE_NODE_COMPANY_DATA_FAILED, message: _message });
  }
};

export const getAddressInfo = (id) => async dispatch => {
  dispatch({ type: types.GET_WORKSPACE_NODE_ADDRESS_INFO_LOADING });
  const url = `${baseUrl}/workspacenodes/company/addressInfo/${id}`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);

    const addressInfo = response.data;
    dispatch({ type: types.GET_WORKSPACE_NODE_ADDRESS_INFO_SUCCESS, addressInfo });
  } catch (error) {
    let _message = message;
    if (error?.response?.status === 403) {
      _message = error.response.data;
    }
    dispatch({ type: types.GET_WORKSPACE_NODE_ADDRESS_INFO_FAILED, message: _message });
  }
};

export const shareWorkspace = (id, firstName, lastName, email, phone, editable, setShareModalOpen) => async dispatch => {
  dispatch({ type: types.SHARE_WORKSPACE_LOADING });

  const url = `${baseUrl}/workspaces/share/${id}`;
  const body = {
    firstName, lastName, email, phone, editable
  };
  const header = authHeader();
  try {
    const response = await axios.post(url, body, header);

    toast.info('Kopier link til offenligt arbejdsområde', {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      toastId: Math.random() * 100 + 10,
      onClick: (e) => {
        navigator.clipboard.writeText(response.data);
        e.target.innerText = 'Kopieret';
      }
    });

    setShareModalOpen(false);

    dispatch({ type: types.SHARE_WORKSPACE_SUCCESS });
  } catch (error) {
    dispatch({ type: types.SHARE_WORKSPACE_FAILED, message });
  }
};

export const accessPublicWorkspace = (workspaceId, userId, publicUserFirstName, publicUserLastName, securityCode) => async dispatch => {
  dispatch({ type: types.PUBLIC_ACCESS_WORKSPACE_LOADING });

  const url = `${baseUrl}/workspaces/public/access/${workspaceId}`;
  const body = {
    userId, securityCode
  };
  const header = authHeader();
  try {
    const response = await axios.post(url, body, header);
    const { workspace, accessToken, user } = response.data;
    const {
      elements, label, description, group, zoom, x_position, y_position, signed, signed_by
    } = workspace;

    dispatch({
      type: types.SHOW_WORKSPACE_SUCCESS, label, description, group, elements, zoom, x_position, y_position, signed, signed_by
    });

    saveToLocalStorage({
      ...accessToken, ...user
    });

    LogRocket.identify(user.id, {
      name: user.first_name + ' ' + user.last_name,
      email: user.email,
    });

    analytics.identify(user.id, {
      name: user.first_name + ' ' + user.last_name,
      email: user.email,
    });

    dispatch({
      type: types.PUBLIC_ACCESS_WORKSPACE_SUCCESS, publicUserFirstName, publicUserLastName, workspaceId, editable: user.editable
    });
  } catch (error) {
    console.log(error.response);
    let _message = message;
    if (error?.response?.status === 403) {
      _message = error.response.data;
    }

    dispatch({ type: types.PUBLIC_ACCESS_WORKSPACE_FAILED, message: _message });
  }
};

export const signWorkspace = (id, setShowSignWorkspace) => async dispatch => {
  const url = `${baseUrl}/workspaces/sign/${id}`;
  const body = {};
  const header = authHeader();
  try {
    await axios.post(url, body, header);
    setShowSignWorkspace(false);
    dispatch(showWorkspace(id));
  } catch (error) {
    dispatch({ type: types.SHARE_WORKSPACE_FAILED, message });
  }
};

export const saveAnalysis = (id, output, subgraph) => async dispatch => {
  const url = `${baseUrl}/workspaces/analysis/${id}`;
  const body = { output, subgraph };
  const header = authHeader();
  try {
    await axios.post(url, body, header);
    dispatch({ type: types.WORKSPACE_ANALYSIS_SAVE_SUCCESS });
  } catch (error) {
    dispatch({ type: types.WORKSPACE_ANALYSIS_SAVE_FAILED, message });
  }
};

export const revisionHistory = (id) => async dispatch => {
  const url = `${baseUrl}/workspaces/analysis/${id}`;
  const header = authHeader();
  try {
    const response = await axios.get(url, header);

    dispatch({ type: types.WORKSPACE_ANALYSIS_REVISION_SUCCESS, revisionHistory: response.data });
  } catch (error) {
    dispatch({ type: types.WORKSPACE_ANALYSIS_REVISION_FAILED, message });
  }
};

export const cvrWorkspacePublic = (id, cvr, erstTypes) => async dispatch => {
  const url = `${baseUrl}/koncerndiagrammer/${id}`;
  const body = {
    cvr,
    erstTypes
  };
  try {
    await axios.post(url, body);
  } catch (error) {
    let _message = 'Vi har desværre nogle problemer med kommunkationen til CVR';

    if (error?.response?.status === 503) {
      _message = 'Du skal være på et Draw plan for at trække selskaber med over 100 elementer';
    }
    dispatch({ type: types.GET_CVR_NODES_FAILED, message: _message });
  }
};

export const mapUncertainCompanies = (id, uncertainCompanies, erstTypes) => async dispatch => {
  dispatch({ type: types.GET_CVR_NODES_LOADING });
  const url = `${baseUrl}/workspaces/uncertainCompanies/${id}`;
  const header = authHeader();
  const body = {
    uncertainCompanies,
    erstTypes
  };
  try {
    await axios.post(url, body, header);
  } catch (error) {
    console.log(error.response);
    const _message = 'Vi har desværre nogle problemer med kommunkationen til CVR';
    dispatch({ type: types.GET_CVR_NODES_FAILED, message: _message });
  }
};

export const analysisTextChange = (text, index) => ({
  type: types.ANALYSIS_TEXT_CHANGE,
  text,
  index
});


export const cvrSuccess = (elements) => ({
  type: types.GET_CVR_NODES_SUCCESS,
  elements
});

export const uncertainCompaniesChange = (companies) => ({
  type: types.HANDLE_UNCERTAIN_COMPANIES,
  companies
});


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

export const shareOrgChange = { type: types.SHARE_ORG_CHANGE };


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

export const showNotifAction = _message => ({
  type: notification.SHOW_NOTIF,
  message: _message
});

export const setPublicAccessFalse = {
  type: types.SET_PUBLIC_ACCESS_FALSE
};

export const firstPublicVisit = {
  type: types.SET_PUBLIC_VISITED,
};

export const setShowCompanyData = show => ({
  type: types.SET_SHOW_COMPANY_DATA,
  show
});

export const setShowAddressInfo = show => ({
  type: types.SET_SHOW_ADDRESS_INFO,
  show
});

export const handleRunIntro = run => ({
  type: types.RUN_INTRO_WORKSPACE,
  run
});

export const changeStepIndex = index => ({
  type: types.CHANGE_STEP_INDEX_WORKSPACE,
  index
});
