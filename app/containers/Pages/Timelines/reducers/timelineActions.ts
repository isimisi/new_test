/* eslint-disable import/prefer-default-export */
import axios from "axios";
import * as notification from "@redux/constants/notifConstants";
import { baseUrl, authHeader, genericErrorMessage } from "@api/constants";
import { User } from "@auth0/auth0-react";
import { History } from "history";
import * as types from "./timelineConstants";
const TIMELINES = "timelines";

export const getAlerts = (user: User) => async (dispatch) => {
  const url = `${baseUrl}/${TIMELINES}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const alerts = response.data;
    dispatch({ type: types.GET_TIMELINES_SUCCESS, alerts });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_TIMELINES_FAILED, message });
  }
};

export const postTimeline = (user: User, history: History) => async (dispatch) => {
  const url = `${baseUrl}/${TIMELINES}`;
  dispatch({ type: types.POST_TIMELINE_LOADING });
  const header = authHeader(user);
  const id = 1;
  history.push(`timelines/${id}`);
  // try {
  //   const response = await axios.get(url, header);
  //   const alerts = response.data;
  //   dispatch({ type: types.POST_TIMELINE_SUCCESS, alerts });
  // } catch (error) {
  //   const message = genericErrorMessage;
  //   dispatch({ type: types.POST_TIMELINE_FAILED, message });
  // }
};

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
