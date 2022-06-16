/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import * as notification from "@redux/constants/notifConstants";
import { baseUrl, authHeader, genericErrorMessage } from "@api/constants";
import { User } from "@auth0/auth0-react";
import { History } from "history";
import * as types from "./timelineConstants";
import { TimelineNode } from "@customTypes/reducers/timeline";
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from "draft-js";
import { isEdge, isNode } from "react-flow-renderer";
import dagre from "dagre";
import { getDocumentDropDown } from "../../Documents/reducers/documentActions";
import { getPersonDropDown } from "../../Persons/reducers/personActions";
const TIMELINES = "timelines";

export const getTimelines = (user: User) => async (dispatch) => {
  dispatch({ type: types.GET_TIMELINES_LOADING, loadingType: "main" });
  const url = `${baseUrl}/${TIMELINES}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const timelines = response.data;
    dispatch({ type: types.GET_TIMELINES_SUCCESS, timelines });
  } catch (error) {
    // @ts-ignore
    console.log(error);
    const message = genericErrorMessage;
    dispatch({ type: types.GET_TIMELINES_FAILED, message });
  }
};

export const postTimeline = (user: User, history: History, label?: string,
  description?: string,
  group?: string,
  tags?: string,
  shareOrg?: boolean,) => async (dispatch) => {
  dispatch({ type: types.POST_TIMELINE_LOADING, loadingType: "post" });

  const url = `${baseUrl}/${TIMELINES}`;
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
    dispatch({ type: types.POST_TIMELINE_SUCCESS });
    history.push(`/app/${TIMELINES}/${id}`);
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.POST_TIMELINE_FAILED, message });
  }
};

export const showTimeline = (user: User, id: string, openMeta, rfInstance) => async (dispatch) => {
  dispatch({ type: types.SHOW_TIMELINE_LOADING, loadingType: "main" });
  const url = `${baseUrl}/${TIMELINES}/${id}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const { title, description, group, tags, is_private: shareOrg, elements } = response.data;

    if (
      (!title || title?.length === 0) &&
      (!description || description?.length === 0) &&
      !group
    ) {
      openMeta(true);
    }

    if (rfInstance) {
      setTimeout(() => {
        rfInstance.fitView();
      }, 200);
    }

    dispatch({ type: types.SHOW_TIMELINE_SUCCESS, title, description, group, tags, shareOrg, elements });
  } catch (error: any) {
    console.log(error);
    const message = genericErrorMessage;
    dispatch({ type: types.SHOW_TIMELINE_FAILED, message });
  }
};

export const putTimeline = (
  user: User,
  id: string,
  title: string,
  description: string,
  group: string,
  tags: string,
  shareOrg: boolean,
  openMeta: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch) => {
  dispatch({ type: types.PUT_TIMELINE_LOADING, loadingType: "modal" });
  const url = `${baseUrl}/${TIMELINES}/${id}`;
  const header = authHeader(user);
  const body = {
    title,
    description,
    group,
    tags,
    shareOrg,
  };

  try {
    await axios.put(url, body, header);
    openMeta(false);
    dispatch({ type: types.PUT_TIMELINE_SUCCESS });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.PUT_TIMELINE_FAILED, message });
  }
};

export const deleteTimelines = (user: User, id: string) => async dispatch => {
  const url = `${baseUrl}/${TIMELINES}/${id}`;
  const header = authHeader(user);
  try {
    await axios.delete(url, header);
    dispatch(getTimelines(user));
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.DELETE_TIMELINE_FAILED, message });
  }
};

export const saveElement = (user: User, timeline_id, element, changedPersons, changedDocuments, handleCloseCreateElement) => async (dispatch) => {
  dispatch({ type: types.POST_TIMELINE_ELEMENT_LOADING, loadingType: "post" });

  const url = `${baseUrl}/timelinenodes`;
  const rawContentState = convertToRaw(element.get("content").getCurrentContent());
  const markup = draftToHtml(rawContentState);
  const _element = element.toJS();
  _element.content = markup;
  const body = { element: _element, changedPersons, changedDocuments, timeline_id };
  const header = authHeader(user);

  try {
    const response = await axios.post(url, body, header);
    dispatch({ type: types.POST_TIMELINE_ELEMENT_SUCCESS, elements: response.data });
    handleCloseCreateElement();
    dispatch(getPersonDropDown(user));
    dispatch(getDocumentDropDown(user));
  } catch (error: any) {
    console.log(error.response);
    const message = genericErrorMessage;
    dispatch({ type: types.POST_TIMELINE_ELEMENT_FAILED, message });
  }
};

export const putElement = (user: User, element, changedPersons, changedDocuments, handleCloseCreateElement) => async (dispatch) => {
  dispatch({ type: types.PUT_TIMELINE_ELEMENT_LOADING, loadingType: "post" });

  const url = `${baseUrl}/timelinenodes/${element.get("id")}`;

  const rawContentState = convertToRaw(element.get("content").getCurrentContent());
  const markup = draftToHtml(rawContentState);
  const _element = element.toJS();
  _element.content = markup;

  const body = { element: _element, changedPersons, changedDocuments };
  const header = authHeader(user);
  console.log(_element);
  try {
    const response = await axios.put(url, body, header);
    dispatch({ type: types.PUT_TIMELINE_ELEMENT_SUCCESS, element: response.data });
    handleCloseCreateElement();
    dispatch(getPersonDropDown(user));
    dispatch(getDocumentDropDown(user));
  } catch (error: any) {
    console.log(error);
    const message = genericErrorMessage;
    dispatch({ type: types.PUT_TIMELINE_ELEMENT_FAILED, message });
  }
};

export const deleteElements = (user: User, timeline_id: string, elements: string[]) => async (dispatch) => {
  dispatch({ type: types.DELETE_TIMELINE_ELEMENTS_LOADING, loadingType: "post" });

  const url = `${baseUrl}/timelinenodes/delete`;
  const body = { elements, timeline_id };
  const header = authHeader(user);

  try {
    const response = await axios.post(url, body, header);
    dispatch({ type: types.DELETE_TIMELINE_ELEMENTS_SUCCESS, elements: response.data });
  } catch (error: any) {
    console.log(error);
    const message = genericErrorMessage;
    dispatch({ type: types.DELETE_TIMELINE_ELEMENTS_FAILED, message });
  }
};

export const importEmails = (user: User, timeline_id: string, files, close) => async (dispatch) => {
  dispatch({ type: types.IMPORT_EMAILS_LOADING, loadingType: "modal" });

  const url = `${baseUrl}/timelines/mail/${timeline_id}?files=${files.length}`;
  const body = new FormData();
  files.forEach((file, index) => {
    body.append("file_" + index, file);
  });
  const header = authHeader(user);

  try {
    const response = await axios.post(url, body, header);
    dispatch({ type: types.IMPORT_EMAILS_SUCCESS, elements: response.data });
    close();
    dispatch(getPersonDropDown(user));
    dispatch(getDocumentDropDown(user));
  } catch (error: any) {
    let message = genericErrorMessage;

    if (error.response.data.status === 403) {
      message = "Vi kan desværre ikke håndtere den ønskede e-mail";
    }

    dispatch({ type: types.IMPORT_EMAILS_FAILED, message });
  }
};

export const labelChange = (title) => ({
  type: types.TITLE_CHANGE,
  title,
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


export const changeHandleVisability = (bool: boolean) => ({
  type: types.SHOW_HANDLES_CHANGE,
  bool,
});

export const createElementChange = (bool: boolean) => ({
  type: types.CREATE_ELEMENT_CHANGE,
  bool,
});

export const timelineElementPersonChange = (bool: boolean) => ({
  type: types.TIMELINE_ELEMENT_PERSON_CHANGE,
  bool,
});

export const timelineElementDocumentChange = (bool: boolean) => ({
  type: types.TIMELINE_ELEMENT_DOCUMENT_CHANGE,
  bool,
});

export const setTimelineNode = (id: string | null, isVertical = false) => ({
  type: types.SET_TIMELINE_NODE,
  id,
  isVertical
});

export const changeTimelineNodeKey = (val: TimelineNode[keyof TimelineNode], attr: keyof TimelineNode) => ({
  type: types.CHANGE_TIMELINE_NODE_KEY,
  val,
  attr,
});

export const openEmailChange = (bool: boolean) => ({
  type: types.OPEN_EMAIL_CHANGE,
  bool,
});

export const changeView = (direction: "vertical" | "horizontal", elements) => async (dispatch) => {
  const nodeWidth = 150;
  const nodeHeight = 41;

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  const isVertical = direction === "vertical";
  dagreGraph.setGraph({ rankdir: isVertical ? "TB" : "LR" });

  elements.forEach(el => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  elements.map((element, index) => {
    if (isNode(element)) {
      const nodeWithPosition = dagreGraph.node(element.id);

      if (element.type !== "addItem") {
        element.position = {
          x: (nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000) - nodeWidth + (isVertical ? 0 : 200 * index),
          y: (nodeWithPosition.y - nodeHeight / 2) - nodeHeight + (isVertical ? 50 * index : 0)
        };

        element.type = direction;
      } else {
        element.position = {
          x: nodeWithPosition.x - nodeHeight / 2 + Math.random() / 1000 - nodeWidth + (isVertical ? 0 : 200 * index),
          y: nodeWithPosition.y - nodeHeight / 2 - nodeHeight + (isVertical ? 50 * index : 0)
        };
      }
    }

    if (isEdge(element) && element.target === "static-button") {
      element.targetHandle = isVertical ? "top" : "left";
      element.sourceHandle = isVertical ? "bottom" : "right";
    }

    return element;
  });

  dispatch({ type: types.CHANGE_VIEW, direction, elements });
};


export const setIsUpdating = (bool) => ({
  type: types.SET_IS_UPDATING,
  bool
});

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF,
};

export const showNotifAction = (_message) => ({
  type: notification.SHOW_NOTIF,
  message: _message,
});
