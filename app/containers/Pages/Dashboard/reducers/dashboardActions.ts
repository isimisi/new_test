/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
import axios from "axios";
import * as notification from "@redux/constants/notifConstants";
import { baseUrl, authHeader, genericErrorMessage } from "@api/constants";
import * as types from "./dashboardConstants";
import { User } from "@auth0/auth0-react";
const DASHBOARD = "dashboard";

export const getElementCounts = (user: User) => async (dispatch) => {
  const url = `${baseUrl}/${DASHBOARD}/elementCounts`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const elementCounts = response.data;
    dispatch({ type: types.GET_ELEMET_COUNTS_SUCCESS, elementCounts });
  } catch (error) {
    console.log(error);
    const message = genericErrorMessage;
    dispatch({ type: types.GET_ELEMET_COUNTS_FAILED, message });
  }
};

export const getNotifications = (user: User) => async (dispatch) => {
  const url = `${baseUrl}/notifications`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const notifications = response.data;
    dispatch({ type: types.GET_NOTIFICATIONS_SUCCESS, notifications });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_NOTIFICATIONS_FAILED, message });
  }
};

export const noIntro = (user: User) => async () => {
  const url = `${baseUrl}/user/noIntro`;
  const header = authHeader(user);
  try {
    await axios.post(url, {}, header);

    // eslint-disable-next-line no-empty
  } catch (error) {}
};

export const postNotifications =
  (user: User, header: string, body: string, icon: string, intrusive: boolean) =>
  async (dispatch) => {
    const url = `${baseUrl}/notifications`;
    const _header = authHeader(user);
    const _body = { header, body, icon, intrusive };
    try {
      await axios.post(url, _body, _header);
    } catch (error) {
      const message = genericErrorMessage;
      dispatch({ type: types.POST_NOTIFICATIONS_FAILED, message });
    }
  };

export const readNotification = (user: User, id: string) => async (dispatch) => {
  const url = `${baseUrl}/read/notifications`;
  const _header = authHeader(user);
  const _body = { id };
  try {
    await axios.post(url, _body, _header);
    dispatch({ type: types.READ_NOTIFICATIONS_SUCCESS, id });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.POST_NOTIFICATIONS_FAILED, message });
  }
};

export const getTimeline = (user: User) => async (dispatch) => {
  const url = `${baseUrl}/${DASHBOARD}/activity`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const timeline = response.data;
    dispatch({ type: types.GET_TIMELINE_SUCCESS, timeline });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_TIMELINE_FAILED, message });
  }
};

export const postFeatureRequest =
  (
    user: User,
    wish: string,
    setFeatureValue: React.Dispatch<React.SetStateAction<string>>
  ) =>
  async (dispatch) => {
    const url = `${baseUrl}/${DASHBOARD}/featureRequest`;
    const body = { wish };
    const header = authHeader(user);
    try {
      await axios.post(url, body, header);
      const message = "Vi har modtaget din forspørgsel";
      dispatch({ type: types.POST_FEATURE_SUCCESS, message });
      setFeatureValue("");
    } catch (error) {
      const message = genericErrorMessage;
      dispatch({ type: types.POST_FEATURE_FAILED, message });
    }
  };

export const helpMe =
  (user: User, name: string, email: string, mesg: string) => async (dispatch) => {
    const url = `${baseUrl}/helpMe`;
    const body = { name, email, mesg };
    const header = authHeader(user);
    try {
      await axios.post(url, body, header);
      const message =
        "Vi har sendt din mail til vores support og vender tilbage hurtigst muligt.";
      dispatch({ type: types.POST_FEATURE_SUCCESS, message });
    } catch (error) {
      const message = genericErrorMessage;
      dispatch({ type: types.POST_FEATURE_FAILED, message });
    }
  };

export const handleRunIntro = (run: boolean) => ({
  type: types.RUN_INTRO,
  run,
});

export const changeStepIndex = (index: number) => ({
  type: types.CHANGE_STEP_INDEX,
  index,
});

export const changeDashboardType = (dashboardType: string) => ({
  type: types.CHANGE_TYPE,
  dashboardType,
});

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF,
};
