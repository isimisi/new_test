/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import axios from "axios";
import * as notification from "@redux/constants/notifConstants";
import {
  baseUrl,
  authHeader,
  genericErrorMessage as message,
  getIdFromEncrypted,
} from "@api/constants";
import { isNode, OnLoadParams, FlowElement } from "react-flow-renderer";
import _history from "@utils/history";
import LogRocket from "logrocket";
import { toast } from "react-toastify";
import * as types from "./workspaceConstants";
import { ErstTypes, initErstTypes } from "../constants";
import { User } from "@auth0/auth0-react";
import { RGBA } from "@customTypes/data";
import { History } from 'history';
import { EdgeData } from "@customTypes/reactFlow";
import { saveAs } from "file-saver";
import { s2ab } from '@helpers/export/handleExport';

const WORKSPACES = "workspaces";

export const getWorkspaces = (user: User) => async (dispatch) => {
  dispatch({ type: types.GET_WORKSPACES_LOADING });
  const url = `${baseUrl}/${WORKSPACES}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const workspaces = response.data;
    dispatch({ type: types.GET_WORKSPACES_SUCCESS, workspaces });
  } catch (error) {
    dispatch({ type: types.GET_WORKSPACES_FAILED, message });
  }
};

export const cvrWorkspace = (user: User, id: string, cvr: string, close: any, erstTypes: ErstTypes) => async (dispatch) => {
  dispatch({ type: types.GET_CVR_NODES_LOADING });
  const url = `${baseUrl}/workspaces/${id}/cvr`;
  const body = { cvr, erstTypes };

  const header = authHeader(user);
  try {
    await axios.post(url, body, header);
  } catch (error) {
    let _message = "Vi har desværre nogle problemer med kommunkationen til CVR";
    // @ts-ignore
    if (error?.response?.status === 503) {
      _message =
        "Du skal være på et Draw plan for at trække selskaber med over 100 elementer";
    }
    dispatch({ type: types.GET_CVR_NODES_FAILED, message: _message });
  }
};

export const analyseAlerts = (
  user: User,
  workspaceId: string,
  setAlerts: (alerts: any, initial: boolean) => void,
  initial = false
) => async () => {
  const url = `${baseUrl}/${WORKSPACES}/analyse/alerts/${workspaceId}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);

    const alerts = response.data;
    setAlerts(alerts, initial);
  } catch (error) {
    // do something
  }
};

export const analyseOutput = (user: User, workspaceId: string) => async (dispatch) => {
  dispatch({ type: types.ANALYSE_OUTPUT_LOADING });
  const url = `${baseUrl}/${WORKSPACES}/analyse/actions/${workspaceId}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const outputs = response.data;

    dispatch({ type: types.ANALYSE_OUTPUT_SUCCESS, outputs });
  } catch (error) {
    dispatch({ type: types.ANALYSE_OUTPUT_FAILED, message });
  }
};

export const postWorkspace = (
  user: User,
  history: History,
  label?: string,
  description?: string,
  group?: string,
  tags?: string,
  shareOrg?: boolean,
  cvr?: string
) => async (dispatch) => {
  const url = `${baseUrl}/${WORKSPACES}`;
  const body = {
    label,
    description,
    group,
    tags,
    shareOrg,
  };
  const header = authHeader(user);

  try {
    const response = await axios.post(url, body, header);
    const id = response.data;
    dispatch({ type: types.POST_WORKSPACE_SUCCESS });
    if (cvr) {
      dispatch(
        cvrWorkspace(user, getIdFromEncrypted(id), cvr, undefined, initErstTypes)
      );
    }
    history.push(`/app/${WORKSPACES}/${id}`);
  } catch (error) {
    dispatch({ type: types.POST_WORKSPACE_FAILED, message });
  }
};

export const showWorkspace = (
  user: User,
  id: string,
  setMetaOpen?: React.Dispatch<React.SetStateAction<boolean>>,
  setAlerts?: (alerts: any, initial: boolean) => void,
  _reactFlowInstance?: OnLoadParams,
) => async (dispatch) => {
  const url = `${baseUrl}/${WORKSPACES}/${id}`;
  dispatch({ type: types.SHOW_WORKSPACE_LOADING });

  const header = authHeader(user);

  try {
    const response = await axios.get(url, header);
    const {
      elements,
      label,
      description,
      group,
      zoom,
      x_position,
      y_position,
      signed,
      signed_by,
      tags,
    } = response.data;

    dispatch({
      type: types.SHOW_WORKSPACE_SUCCESS,
      label,
      description,
      group,
      elements,
      zoom,
      x_position,
      y_position,
      signed,
      signed_by,
      tags,
    });

    if (
      (!label || label?.length === 0) &&
      (!description || description?.length === 0) &&
      !group
    ) {
      setMetaOpen && setMetaOpen(true);
    }
    setAlerts && dispatch(analyseAlerts(user, id, setAlerts, true));

    if (_reactFlowInstance) {
      _reactFlowInstance.fitView();
    }
  } catch (error) {
    // @ts-ignore
    console.log(error.response);
    // @ts-ignore
    if (error?.response?.status === 403) {
      _history.replace("/app/not-found");
    } else {
      dispatch({ type: types.SHOW_WORKSPACE_FAILED, message });
    }
  }
};

export const putWorkspace = (
  user: User,
  workspace_id: string,
  label: string,
  description: string,
  group: string,
  tags: string,
  shareOrg: boolean,
  setMetaOpen: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch) => {
  const url = `${baseUrl}/${WORKSPACES}/${workspace_id}`;
  const body = {
    label,
    description,
    group,
    shareOrg,
    tags,
  };
  const header = authHeader(user);

  try {
    await axios.put(url, body, header);
    dispatch({ type: types.PUT_WORKSPACE_SUCCESS });

    setMetaOpen(false);

    // setTimeout(() => {
    //   // eslint-disable-next-line no-use-before-define
    //   dispatch(changeStepIndex(2));
    // }, 100);
  } catch (error) {
    dispatch({ type: types.PUT_WORKSPACE_FAILED, message });
  }
};

export const saveWorkspace = (
  user: User,
  workspace_id: string,
  workspaceZoom: number,
  workspaceXPosition: number,
  workspaceYPosition: number,
  nodes: string,
) => async (dispatch) => {
  const url = `${baseUrl}/${WORKSPACES}/${workspace_id}/position`;
  const body = {
    workspaceZoom,
    workspaceXPosition,
    workspaceYPosition,
    nodes,
  };
  const header = authHeader(user);
  try {
    await axios.put(url, body, header);
    dispatch({ type: types.SAVE_WORKSPACE_SUCCESS });
  } catch (error) {
    // @ts-ignore
    dispatch({ type: types.SAVE_WORKSPACE_FAILED, message });
  }
};

export const deleteWorkspaces = (user: User, id: string, title: string) => async (dispatch) => {
  const url = `${baseUrl}/${WORKSPACES}/${id}`;
  const header = authHeader(user);
  try {
    await axios.delete(url, header);
    const _message = `Du har slettet ${title}`;
    dispatch({ type: types.DELETE_WORKSPACE_SUCCESS, message: _message });
    dispatch(getWorkspaces(user));
  } catch (error) {
    let _message = message;
    // @ts-ignore
    if (error?.response?.status === 403) {
      // @ts-ignore
      _message = error.response.data;
    }
    if (!id) {
      _message = "Du kan ikke slette arbejdsområder, som er udløbet.";
    }
    dispatch({ type: types.DELETE_WORKSPACE_FAILED, message: _message });
  }
};

export const deleteWorkspaceElement = (
  user: User,
  elementsToRemove: FlowElement[],
  remainingElements: FlowElement[]
) => async (dispatch) => {
  const header = authHeader(user);

  if (elementsToRemove.length === 1 && !isNode(elementsToRemove[0])) {
    const url = `${baseUrl}/${WORKSPACES}/relationship/${
      elementsToRemove[0].id
    }`;

    try {
      await axios.delete(url, header);
      dispatch({
        type: types.DELETE_WORKSPACE_ELEMENTS_SUCCESS,
        remainingElements,
      });
    } catch (error) {
      dispatch({ type: types.DELETE_WORKSPACE_ELEMENTS_FAILED, message });
    }
  } else {
    const url = `${baseUrl}/${WORKSPACES}/elements`;
    const elements = elementsToRemove
      .filter((element) => isNode(element))
      .map((element) => element.id);
    const body = { elements };

    dispatch({
      type: types.DELETE_WORKSPACE_ELEMENTS_SUCCESS,
      remainingElements,
    });
    try {
      await axios.post(url, body, header);
    } catch (error) {
      dispatch({ type: types.DELETE_WORKSPACE_ELEMENTS_FAILED, message });
    }
  }
};

export const postNode = (
  user: User,
  workspace_id: string,
  node_id: number,
  nodeLabel: string,
  display_name: string,
  figur: string | null,
  background_color: string,
  border_color: string,
  attributes: string,
  close: () => void,
  setAlerts: ((alerts: any, initial?: boolean) => void) | null,
  x,
  y
) => async (dispatch) => {
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
    "x-value": x,
    "y-value": y,
  };
  const header = authHeader(user);

  try {
    const response = await axios.post(url, body, header);
    const node = response.data;
    dispatch({ type: types.WORKSPACE_POST_NODE_SUCCESS, node });
    close();
    setAlerts && dispatch(analyseAlerts(user, workspace_id, setAlerts));
  } catch (error) {
    dispatch({ type: types.WORKSPACE_POST_NODE_FAILED, message });
  }
};

export const addElements = (user: User, id: string, elements: FlowElement[]) => async (dispatch) => {
  dispatch({ type: types.WORKSPACE_ADD_ELEMENTS, elements });
  const url = `${baseUrl}/${WORKSPACES}/addElements/${id}`;
  const body = { elements: JSON.stringify(elements) };
  const header = authHeader(user);
  try {
    const response = await axios.post(url, body, header);
    const { nodesWithOrgId, edgesWithOrgId } = response.data;
    dispatch({
      type: types.WORKSPACE_UPDATE_ELEMENTS,
      nodesWithOrgId,
      edgesWithOrgId,
    });
  } catch (error) {
    dispatch({ type: types.WORKSPACE_POST_NODE_FAILED, message });
  }
};

export const putNode = (
  user: User,
  workspaceNodeId: string,
  node_id: number,
  nodeLabel: string,
  display_name: string,
  figur: string | null,
  backgroundColor: string,
  borderColor: string,
  attributes: string,
  deletedAttributes: string,
  close: () => void
) => async (dispatch) => {
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
  const header = authHeader(user);
  try {
    const response = await axios.put(url, body, header);
    const node = response.data;
    dispatch({ type: types.WORKSPACE_PUT_NODE_SUCCESS, node });
    close();
  } catch (error) {
    dispatch({ type: types.WORKSPACE_PUT_NODE_FAILED, message });
  }
};

export const postEdge = (
  user: User,
  workspace_id: string,
  edge: EdgeData,
  close: () => void,
  setAlert: ((alerts: any, initial: boolean) => void) | null
) => async (
  dispatch
) => {
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
    line_through: edge.lineThrough,
  };
  const header = authHeader(user);

  try {
    const response = await axios.post(url, body, header);
    const responseEdge = response.data;
    dispatch({ type: types.POST_EDGE_SUCCESS, edge: responseEdge });
    close();
    setAlert && dispatch(analyseAlerts(user, workspace_id, setAlert));
  } catch (error) {
    console.log(error);
    dispatch({ type: types.POST_EDGE_FAILED, message });
  }
};

export const putEdge = (
  user: User,
  edgeId: string,
  relationship_id: string,
  relationshipLabel: string,
  relationshipValue: string,
  relationshipColor: RGBA,
  relationshipType: string | null,
  showArrow: boolean,
  animatedLine: boolean,
  showLabel: boolean,
  lineThrough: boolean,
  close: () => void,
  setIsUpdatingElement: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch) => {
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
    line_through: lineThrough,
  };
  const header = authHeader(user);

  try {
    const response = await axios.put(url, body, header);
    const responseEdge = response.data;

    dispatch({ type: types.PUT_EDGE_SUCCESS, edge: responseEdge });
    close();
    setIsUpdatingElement(false);
  } catch (error) {
    console.log({ error });
    dispatch({ type: types.PUT_EDGE_FAILED, message });
  }
};

export const getNodes = (user: User, group: string) => async (dispatch) => {
  const url = `${baseUrl}/nodes/workspace?group=${group}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const nodes = response.data.filter((n) => n.label !== "*");
    dispatch({ type: types.GET_NODE_VALUES_SUCCESS, nodes });
  } catch (error) {
    dispatch({ type: types.GET_NODE_VALUES_FAILED, message });
  }
};

export const getRelationships = (user: User, group: string) => async (dispatch) => {
  const url = `${baseUrl}/relationships/workspace?group=${group}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const relationships = response.data;
    dispatch({ type: types.GET_RELATIONSHIP_VALUES_SUCCESS, relationships });
  } catch (error) {
    dispatch({ type: types.GET_RELATIONSHIP_VALUES_FAILED, message });
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
    dispatch({ type: types.GET_GROUP_DROPDOWN_FAILED, message });
  }
};

export const getAttributeDropDown = (user: User, group: string) => async (dispatch) => {
  const url = `${baseUrl}/attributs/dropDownValues?group=${group}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const attributes = response.data;
    dispatch({ type: types.GET_ATTRIBUTE_DROPDOWN_SUCCESS, attributes });
  } catch (error) {
    dispatch({ type: types.GET_ATTRIBUTE_DROPDOWN_FAILED, message });
  }
};

export const postSticky = (user: User, workspace_id: string, x: number, y: number) => async (dispatch) => {
  const url = `${baseUrl}/workspaces/sticky`;
  const body = {
    workspace_id,
    "x-value": x,
    "y-value": y,
  };
  const header = authHeader(user);
  try {
    const response = await axios.post(url, body, header);
    const node = response.data;
    dispatch({ type: types.WORKSPACE_POST_NODE_SUCCESS, node });
  } catch (error) {
    dispatch({ type: types.WORKSPACE_POST_NODE_FAILED, message });
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const putSticky = (user: User, id: string, text: string) => async (dispatch) => {
  const url = `${baseUrl}/workspaces/sticky/${id}`;
  const body = {
    text,
  };
  const header = authHeader(user);
  try {
    await axios.put(url, body, header);
  } catch (error) {
    // do something
  }
};

export const getCompanyData = (user: User, id: string, setShowContextMenu?: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch) => {
  dispatch({ type: types.GET_WORKSPACE_NODE_COMPANY_DATA_LOADING });
  const url = `${baseUrl}/workspacenodes/company/info/${id}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);

    const companyData = response.data;
    dispatch({
      type: types.GET_WORKSPACE_NODE_COMPANY_DATA_SUCCESS,
      companyData,
    });

    dispatch({ type: types.SET_SHOW_COMPANY_DATA, show: true });
    setShowContextMenu && setShowContextMenu(false);
  } catch (error) {
    let _message = message;
    // @ts-ignore
    if (error?.response?.status === 403) {
      // @ts-ignore
      _message = error.response.data;
    }
    dispatch({
      type: types.GET_WORKSPACE_NODE_COMPANY_DATA_FAILED,
      message: _message,
    });
  }
};

export const getAddressInfo = (user: User, id: string, setShowContextMenu: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch) => {
  dispatch({ type: types.GET_WORKSPACE_NODE_ADDRESS_INFO_LOADING });
  const url = `${baseUrl}/workspacenodes/company/addressInfo/${id}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);

    const addressInfo = response.data;
    dispatch({
      type: types.GET_WORKSPACE_NODE_ADDRESS_INFO_SUCCESS,
      addressInfo,
    });
    setShowContextMenu(false);
  } catch (error) {
    let _message = message;
    // @ts-ignore
    if (error?.response?.status === 403) {
      // @ts-ignore
      _message = error.response.data;
    }
    dispatch({
      type: types.GET_WORKSPACE_NODE_ADDRESS_INFO_FAILED,
      message: _message,
    });
  }
};

export const shareWorkspace = (
  user: User,
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  editable: boolean,
  setShareModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch) => {
  dispatch({ type: types.SHARE_WORKSPACE_LOADING });

  const url = `${baseUrl}/workspaces/share/${id}`;
  const body = {
    firstName,
    lastName,
    email,
    phone,
    editable,
  };
  const header = authHeader(user);
  try {
    const response = await axios.post(url, body, header);

    toast.info("Kopier link til offenligt arbejdsområde", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      toastId: Math.random() * 100 + 10,
      onClick: (e) => {
        navigator.clipboard.writeText(response.data);
        // @ts-ignore
        e.target.innerText = "Kopieret";
      },
    });

    setShareModalOpen(false);

    dispatch({ type: types.SHARE_WORKSPACE_SUCCESS });
  } catch (error) {
    dispatch({ type: types.SHARE_WORKSPACE_FAILED, message });
  }
};

export const accessPublicWorkspace = (
  dbuser: User,
  workspaceId: string,
  userId: string,
  publicUserFirstName: string,
  publicUserLastName: string,
  securityCode: string,
) => async (dispatch) => {
  dispatch({ type: types.PUBLIC_ACCESS_WORKSPACE_LOADING });

  const url = `${baseUrl}/workspaces/public/access/${workspaceId}`;
  const body = {
    userId,
    securityCode,
  };
  const header = authHeader(dbuser);
  try {
    const response = await axios.post(url, body, header);
    const { workspace, user } = response.data;
    const {
      elements,
      label,
      description,
      group,
      zoom,
      x_position,
      y_position,
      signed,
      signed_by,
    } = workspace;

    dispatch({
      type: types.SHOW_WORKSPACE_SUCCESS,
      label,
      description,
      group,
      elements,
      zoom,
      x_position,
      y_position,
      signed,
      signed_by,
    });

    LogRocket.identify(user.id, {
      name: user.first_name + " " + user.last_name,
      email: user.email,
    });

    analytics.identify(user.id, {
      name: user.first_name + " " + user.last_name,
      email: user.email,
    });

    dispatch({
      type: types.PUBLIC_ACCESS_WORKSPACE_SUCCESS,
      publicUserFirstName,
      publicUserLastName,
      workspaceId,
      editable: user.editable,
    });
  } catch (error) {
    let _message = message;
    // @ts-ignore
    if (error?.response?.status === 403) {
      // @ts-ignore
      _message = error.response.data;
    }

    dispatch({ type: types.PUBLIC_ACCESS_WORKSPACE_FAILED, message: _message });
  }
};

export const signWorkspace = (user: User, id: string, setShowSignWorkspace: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch) => {
  const url = `${baseUrl}/workspaces/sign/${id}`;
  const body = {};
  const header = authHeader(user);
  try {
    await axios.post(url, body, header);
    setShowSignWorkspace(false);
    dispatch(showWorkspace(user, id));
  } catch (error) {
    dispatch({ type: types.SHARE_WORKSPACE_FAILED, message });
  }
};

export const saveAnalysis = (user: User, id: string, output: string, subgraph: string) => async (dispatch) => {
  const url = `${baseUrl}/workspaces/analysis/${id}`;
  const body = { output, subgraph };
  const header = authHeader(user);
  try {
    await axios.post(url, body, header);
    dispatch({ type: types.WORKSPACE_ANALYSIS_SAVE_SUCCESS });
  } catch (error) {
    dispatch({ type: types.WORKSPACE_ANALYSIS_SAVE_FAILED, message });
  }
};

export const revisionHistory = (user: User, id: string) => async (dispatch) => {
  const url = `${baseUrl}/workspaces/analysis/${id}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);

    dispatch({
      type: types.WORKSPACE_ANALYSIS_REVISION_SUCCESS,
      revisionHistory: response.data,
    });
  } catch (error) {
    dispatch({ type: types.WORKSPACE_ANALYSIS_REVISION_FAILED, message });
  }
};

export const cvrWorkspacePublic = (user: User, id: string, cvr: string, erstTypes: ErstTypes) => async (dispatch) => {
  const url = `${baseUrl}/koncerndiagrammer/${id}`;
  const body = {
    cvr,
    erstTypes,
  };
  try {
    await axios.post(url, body);
  } catch (error) {
    let _message = "Vi har desværre nogle problemer med kommunkationen til CVR";
    // @ts-ignore
    if (error?.response?.status === 503) {
      _message =
        "Du skal være på et Draw plan for at trække selskaber med over 100 elementer";
    }
    dispatch({ type: types.GET_CVR_NODES_FAILED, message: _message });
  }
};

export const connectNewUser = (user: User, id: string) => async (dispatch) => {
  const url = `${baseUrl}/workspaces/newUserConnected/${id}`;
  const header = authHeader(user);
  try {
    await axios.get(url, header);
  } catch (error) {
    // @ts-ignore
    console.log(error.response);
  }
};

export const workspacePowerpoint = (user: User, id: string, label: string, stopLoading: () => void) => async (dispatch) => {
  const url = `${baseUrl}/workspaces/powerpoint/${id}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const { powerpoint } = response.data;
    const linkSource = `data:application/pptx;base64,${powerpoint}`;
    const downloadLink = document.createElement("a");
    const fileName = label + ".pptx";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();


    stopLoading();
  } catch (error) {
    console.log(error);
    stopLoading();
  }
};

export const mapUncertainCompanies = (
  user: User,
  id: string,
  uncertainCompanies: any,
  erstTypes: ErstTypes
) => async (dispatch) => {
  dispatch({ type: types.GET_CVR_NODES_LOADING });
  const url = `${baseUrl}/workspaces/uncertainCompanies/${id}`;
  const header = authHeader(user);
  const body = {
    uncertainCompanies,
    erstTypes,
  };
  try {
    await axios.post(url, body, header);
  } catch (error) {
    const _message =
      "Vi har desværre nogle problemer med kommunkationen til CVR";
    dispatch({ type: types.GET_CVR_NODES_FAILED, message: _message });
  }
};

export const analysisTextChange = (text, index) => ({
  type: types.ANALYSIS_TEXT_CHANGE,
  text,
  index,
});

export const cvrSuccess = (elements) => ({
  type: types.GET_CVR_NODES_SUCCESS,
  elements,
});

export const layoutElements = (elements) => ({
  type: types.LAYOUT_ELEMENTS,
  elements,
});

export const uncertainCompaniesChange = (companies) => ({
  type: types.HANDLE_UNCERTAIN_COMPANIES,
  companies,
});

export const labelChange = (label) => ({
  type: types.LABEL_CHANGE,
  label,
});

export const descriptionChange = (description) => ({
  type: types.DESCRIPTION_CHANGE,
  description,
});

export const addGroup = (group) => ({
  type: types.ADD_GROUP,
  group,
});

export const changeTags = (tags) => ({
  type: types.CHANGE_TAGS,
  tags,
});

export const shareOrgChange = { type: types.SHARE_ORG_CHANGE };

export const addEdgeToList = (edge) => ({
  type: types.EDGE_ADD_TO_LIST,
  edge,
});

export const addWorkspaceNodeToList = (node) => ({
  type: types.WORKSPACE_NODE_ADD_TO_LIST,
  node,
});

export const addWorkspaceNodeAttributToList = (attribut) => ({
  type: types.WORKSPACE_NODE_ATTRIBUT_ADD_TO_LIST,
  attribut,
});

export const changeHandleVisability = (bool) => ({
  type: types.SHOW_HANDLES_CHANGE,
  bool,
});

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF,
};

export const showNotifAction = (_message) => ({
  type: notification.SHOW_NOTIF,
  message: _message,
});

export const setPublicAccessFalse = {
  type: types.SET_PUBLIC_ACCESS_FALSE,
};

export const firstPublicVisit = {
  type: types.SET_PUBLIC_VISITED,
};

export const stopLoading = {
  type: types.STOP_LOADING,
};

export const setShowCompanyData = (show) => ({
  type: types.SET_SHOW_COMPANY_DATA,
  show,
});

export const setShowAddressInfo = (show) => ({
  type: types.SET_SHOW_ADDRESS_INFO,
  show,
});

export const handleRunIntro = (run) => ({
  type: types.RUN_INTRO_WORKSPACE,
  run,
});


export const changeStepIndex = (index) => ({
  type: types.CHANGE_STEP_INDEX_WORKSPACE,
  index,
});

export const setConnectedUsers = (user) => ({
  type: types.SET_CONNECTED_USERS,
  user,
});

export const removeConnectedUsers = (user) => ({
  type: types.REMOVE_CONNECTED_USERS,
  user,
});
