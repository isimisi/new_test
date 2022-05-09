/* eslint-disable import/prefer-default-export */
import axios from "axios";
import * as notification from "@redux/constants/notifConstants";
import { baseUrl, authHeader, genericErrorMessage } from "@api/constants";
import { User } from "@auth0/auth0-react";
import * as types from "./documentConstants";
import { Document } from "@customTypes/reducers/document";
const DOCUMENTS = "timelinedocuments";

export const getDocuments = (user: User) => async (dispatch) => {
  dispatch({ type: types.GET_DOCUMENTS_LOADING, loadingType: "main" });
  const url = `${baseUrl}/${DOCUMENTS}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const documents = response.data;
    dispatch({ type: types.GET_DOCUMENTS_SUCCESS, documents });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_DOCUMENTS_FAILED, message });
  }
};

export const postDocument = (user: User, history: any) => async (dispatch) => {
  dispatch({ type: types.POST_DOCUMENT_LOADING, loadingType: "post" });

  const url = `${baseUrl}/${DOCUMENTS}`;

  const header = authHeader(user);

  try {
    const response = await axios.post(url, {}, header);
    const id = response.data;
    dispatch({ type: types.POST_DOCUMENT_SUCCESS });
    history.push(`/app/documents/${id}`);
  } catch (error) {
    // @ts-ignore
    console.log(error.response);
    const message = genericErrorMessage;
    dispatch({ type: types.POST_DOCUMENT_FAILED, message });
  }
};

export const showDocument = (user: User, id: string, openDocument?: () => void) => async (
  dispatch
) => {
  dispatch({ type: types.SHOW_DOCUMENT_LOADING, loadingType: "main" });
  const url = `${baseUrl}/${DOCUMENTS}/${id}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const document = response.data;

    dispatch({ type: types.SHOW_DOCUMENT_SUCCESS, document });
    if (openDocument) {
      openDocument();
    }
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.SHOW_DOCUMENT_FAILED, message });
  }
};

export const putDocument = (
  user: User,
  id: string,
  document: Document,
  file,
  history
) => async (dispatch) => {
  dispatch({ type: types.PUT_DOCUMENT_LOADING, loadingType: "post" });
  const url = `${baseUrl}/${DOCUMENTS}/${id}`;
  const header = authHeader(user);
  const hasNewDoc = Boolean(file);
  header.params = {
    ...document,
    tags: JSON.stringify(document.tags),
    hasNewDoc,
  };

  let body;
  if (hasNewDoc) {
    body = new FormData();
    body.append("file_content", file);
  }
  try {
    await axios.put(url, body, header);
    dispatch({ type: types.PUT_DOCUMENT_SUCCESS });
    history.push(`/app/documents`);
  } catch (error) {
    // @ts-ignore
    console.log(error.response);
    const message = genericErrorMessage;
    dispatch({ type: types.PUT_DOCUMENT_FAILED, message });
  }
};

export const deleteDocument = (user: User, id: string) => async (dispatch) => {
  const url = `${baseUrl}/${DOCUMENTS}/${id}`;
  const header = authHeader(user);
  try {
    await axios.delete(url, header);
    dispatch({ type: types.DELETE_DOCUMENT_SUCCESS, id });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.DELETE_DOCUMENT_FAILED, message });
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
    const message = genericErrorMessage;
    dispatch({ type: types.GET_GROUP_DROPDOWN_FAILED, message });
  }
};

export const getDocumentDropDown = (user: User) => async (dispatch) => {
  const url = `${baseUrl}/${DOCUMENTS}/dropDownValues`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const documents = response.data;
    dispatch({ type: types.GET_DOCUMENT_DROPDOWN_SUCCESS, documents });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_DOCUMENT_DROPDOWN_FAILED, message });
  }
};

export const changeDocument = (val: string, attr: keyof Document | "initial") => ({
  type: types.CHANGE_DOCUMENT,
  val,
  attr,
});

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF,
};

export const showNotifAction = (_message) => ({
  type: notification.SHOW_NOTIF,
  message: _message,
});
