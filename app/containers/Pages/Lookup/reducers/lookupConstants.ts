import { NotifyActions } from "@redux/constants/notifConstants";

export const GET_COMPANIES_LOADING = "GET_COMPANIES_LOADING";
export const GET_COMPANIES_SUCCESS = "GET_COMPANIES_SUCCESS";
export const GET_COMPANIES_FAILED = "GET_COMPANIES_FAILED";

export const GET_COMPANY_LOADING = "GET_COMPANY_LOADING";
export const GET_COMPANY_SUCCESS = "GET_COMPANY_SUCCESS";
export const GET_COMPANY_FAILED = "GET_COMPANY_FAILED";

export const MONITOR_COMPANY_LOADING = "MONITOR_COMPANY_LOADING";
export const MONITOR_COMPANY_SUCCESS = "MONITOR_COMPANY_SUCCESS";
export const MONITOR_COMPANY_FAILED = "MONITOR_COMPANY_FAILED";

export interface GetCompaniesLoading {
  type: typeof GET_COMPANIES_LOADING;
}
export interface GetCompaniesSuccess {
  type: typeof GET_COMPANIES_SUCCESS;
  lookups: any;
}
export interface GetCompaniesFailed {
  type: typeof GET_COMPANIES_FAILED;
  message: string;
}

export interface GetCompanyLoading {
  type: typeof GET_COMPANY_LOADING;
}
export interface GetCompanySuccess {
  type: typeof GET_COMPANY_SUCCESS;
  company: any;
}
export interface GetCompanyFailed {
  type: typeof GET_COMPANY_FAILED;
  message: string;
}

export interface MonitorCompanyLoading {
  type: typeof MONITOR_COMPANY_LOADING;
}
export interface MonitorCompanySuccess {
  type: typeof MONITOR_COMPANY_SUCCESS;
}
export interface MonitorCompanyFailed {
  type: typeof MONITOR_COMPANY_FAILED;
  message: string;
}

export type LookupActions =
  | GetCompaniesLoading
  | GetCompaniesSuccess
  | GetCompaniesFailed
  | GetCompanyLoading
  | GetCompanySuccess
  | GetCompanyFailed
  | MonitorCompanyLoading
  | MonitorCompanySuccess
  | MonitorCompanyFailed
  | NotifyActions;
