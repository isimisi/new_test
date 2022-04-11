/* eslint-disable import/prefer-default-export */
import axios from "axios";
import * as notification from "@redux/constants/notifConstants";
import { baseUrl, authHeader, genericErrorMessage } from "@api/constants";
import { User } from "@auth0/auth0-react";
import { History } from "history";
import * as types from "./personConstants";
const PERSONS = "persons";

export const getAlerts = (user: User) => async (dispatch) => {
  const url = `${baseUrl}/${PERSONS}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const alerts = response.data;
    dispatch({ type: types.GET_ALERTS_SUCCESS, alerts });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_ALERTS_FAILED, message });
  }
};
