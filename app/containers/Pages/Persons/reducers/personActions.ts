/* eslint-disable import/prefer-default-export */
import axios from "axios";
import * as notification from "@redux/constants/notifConstants";
import { baseUrl, authHeader, genericErrorMessage } from "@api/constants";
import { User } from "@auth0/auth0-react";
import { History } from "history";

import * as types from "./personConstants";
import { Person } from "@customTypes/reducers/person";
const PERSONS = "timelinepeople";

export const getPersons = (user: User) => async (dispatch) => {
  dispatch({ type: types.GET_PERSONS_LOADING, loadingType: "main" });
  const url = `${baseUrl}/${PERSONS}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const persons = response.data;
    dispatch({ type: types.GET_PERSONS_SUCCESS, persons });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_PERSONS_FAILED, message });
  }
};

export const postPerson = (user: User, history) => async (dispatch) => {
  dispatch({ type: types.POST_PERSON_LOADING, loadingType: "post" });

  const url = `${baseUrl}/${PERSONS}`;
  const body = {};
  const header = authHeader(user);

  try {
    const response = await axios.post(url, body, header);
    const id = response.data;
    dispatch({ type: types.POST_PERSON_SUCCESS });
    history.push(`/app/persons/${id}`);
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.POST_PERSON_FAILED, message });
  }
};

export const showPerson = (user: User, id: string, openModal?: () => void) => async (
  dispatch
) => {
  dispatch({ type: types.SHOW_PERSON_LOADING, loadingType: "main" });
  const url = `${baseUrl}/${PERSONS}/${id}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const person = response.data;

    dispatch({ type: types.SHOW_PERSON_SUCCESS, person });
    if (openModal) {
      openModal();
    }
  } catch (error) {
    // @ts-ignore
    console.log(error);
    const message = genericErrorMessage;
    dispatch({ type: types.SHOW_PERSON_FAILED, message });
  }
};

export const putPerson = (
  user: User,
  id: string,
  person: Person,
  history?: History,
  close?: () => void
) => async (dispatch) => {
  dispatch({ type: types.PUT_PERSON_LOADING, loadingType: "post" });
  const url = `${baseUrl}/${PERSONS}/${id}`;
  const header = authHeader(user);

  try {
    await axios.put(url, person, header);
    dispatch({ type: types.PUT_PERSON_SUCCESS });
    history && history.push("/app/persons");
    close && close();
  } catch (error) {
    // @ts-ignore

    const message = genericErrorMessage;
    dispatch({ type: types.PUT_PERSON_FAILED, message });
  }
};

export const deletePerson = (user: User, id: string) => async (dispatch) => {
  const url = `${baseUrl}/${PERSONS}/${id}`;
  const header = authHeader(user);
  try {
    await axios.delete(url, header);
    dispatch({ type: types.DELETE_PERSON_SUCCESS, id });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.DELETE_PERSON_FAILED, message });
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

export const getPersonDropDown = (user: User, id) => async (dispatch) => {
  const url = `${baseUrl}/${PERSONS}/dropDownValues?id=${id}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const persons = response.data;
    dispatch({ type: types.GET_PERSON_DROPDOWN_SUCCESS, persons });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_PERSON_DROPDOWN_FAILED, message });
  }
};

export const changePerson = (val: string, attr: keyof Person | "initial") => ({
  type: types.CHANGE_PERSON,
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
