/* eslint-disable camelcase */
import axios from "axios";
import * as notification from "@redux/constants/notifConstants";
import { baseUrl, authHeader, genericErrorMessage } from "@api/constants";
import * as types from "./createOrganizationConstants";
import { User } from "@auth0/auth0-react";
import { History } from "history";

export const createOrganization = (
  user: User,
  cvr: string,
  country: string,
  history: History
) => async (dispatch) => {
  const url = `${baseUrl}/organization`;
  const body = { cvr, country };
  const header = authHeader(user);
  try {
    await axios.post(url, body, header);

    history.push("/app/create/organiazation/choose/plan");
  } catch (error) {
    let message = genericErrorMessage;
    // @ts-ignore
    if (error.response) {
      // @ts-ignore
      const { message: validatorMessage } = error.response.data;
      message = validatorMessage;
    }
    dispatch({ type: types.STORE_ORGANIZATION_FAILED, message });
  }
};

export const askForADemo = (user: User, id: string) => async (dispatch) => {
  const url = `${baseUrl}/user/demo/${id}`;
  const header = authHeader(user);
  try {
    await axios.get(url, header);
    const message =
      "Tak for din interesse. Vi kontakter dig hurtigst muligt angående tid for demo.";
    dispatch({ type: types.DEMO_SUCCESS, message });
  } catch (error) {
    const message =
      "Hov, vi har nogle problemer, så mailen blev ikke sendt, prøv direkte på hej@juristic.io";
    dispatch({ type: types.DEMO_FAILED, message });
  }
};

export const purchase = (
  user: User,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch) => {
  const url = `${baseUrl}/checkout`;
  const header = authHeader(user);

  try {
    const response = await axios.get(url, header);
    window.location.href = response.data;
    setLoading(false);
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.PURCHASE_FAILED, message });
  }
};

export const customerPortal = (user: User, uri: string) => async (dispatch) => {
  const url = `${baseUrl}/customer/portal?url=https://app.juristic.io${uri}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    window.location.href = response.data;
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.PURCHASE_FAILED, message });
  }
};

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF,
};
