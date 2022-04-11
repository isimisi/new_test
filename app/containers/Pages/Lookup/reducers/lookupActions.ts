/* eslint-disable import/prefer-default-export */
import axios from "axios";
import * as notification from "@redux/constants/notifConstants";
import { baseUrl, authHeader, genericErrorMessage } from "@api/constants";
import { User } from "@auth0/auth0-react";
import { History } from "history";
import * as types from "./lookupConstants";
import { SelectOptions } from "@customTypes/data";
const LOOKUP = "lookup";

export const getLookups = (user: User, inputValue: string) => async (dispatch) => {
  dispatch({ type: types.GET_COMPANIES_LOADING });
  const url = `${baseUrl}/${LOOKUP}?q=${inputValue}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const lookups = response.data;

    dispatch({ type: types.GET_COMPANIES_SUCCESS, lookups });
  } catch (error) {
    const message = genericErrorMessage;
    dispatch({ type: types.GET_COMPANIES_FAILED, message });
  }
};

export const getCompany = (
  user: User,
  cvr: string,
  setYears: (keys: SelectOptions[]) => void,
  handleYear: (val: SelectOptions) => void
) => async (dispatch) => {
  dispatch({ type: types.GET_COMPANY_LOADING });
  const url = `${baseUrl}/${LOOKUP}/company?cvr=${cvr}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const company = response.data;
    if (company.primaryFinancials) {
      const keys = Object.entries(company.primaryFinancials);
      const filteredYears = keys.filter((key) => key[1]);

      const financialYears = filteredYears
        .map((x) => ({
          value: x[0].replace("year", ""),
          label: x[0].replace("year", ""),
        }))
        .sort((a, b) => Number(b.value) - Number(a.value));

      setYears(financialYears);
      handleYear(financialYears[0]);
    }

    dispatch({ type: types.GET_COMPANY_SUCCESS, company });
  } catch (error) {
    console.log(error);
    const message = genericErrorMessage;
    dispatch({ type: types.GET_COMPANY_FAILED, message });
  }
};
