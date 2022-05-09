import {
  Loadings,
  Person,
  PersonCleanOption,
  PersonTableOptions,
} from "@customTypes/reducers/person";

import { NotifyActions } from "@redux/constants/notifConstants";

export const GET_PERSONS_LOADING = "GET_PERSONS_LOADING";
export const GET_PERSONS_SUCCESS = "GET_PERSONS_SUCCESS";
export const GET_PERSONS_FAILED = "GET_PERSONS_FAILED";

export const POST_PERSON_LOADING = "POST_PERSON_LOADING";
export const POST_PERSON_SUCCESS = "POST_PERSON_SUCCESS";
export const POST_PERSON_FAILED = "POST_PERSON_FAILED";

export const SHOW_PERSON_LOADING = "SHOW_PERSON_LOADING";
export const SHOW_PERSON_SUCCESS = "SHOW_PERSON_SUCCESS";
export const SHOW_PERSON_FAILED = "SHOW_PERSON_FAILED";

export const PUT_PERSON_LOADING = "PUT_PERSON_LOADING";
export const PUT_PERSON_SUCCESS = "PUT_PERSON_SUCCESS";
export const PUT_PERSON_FAILED = "PUT_PERSON_FAILED";

export const DELETE_PERSON_LOADING = "DELETE_PERSON_LOADING";
export const DELETE_PERSON_SUCCESS = "DELETE_PERSON_SUCCESS";
export const DELETE_PERSON_FAILED = "DELETE_PERSON_FAILED";

export const GET_GROUP_DROPDOWN_SUCCESS = "GET_GROUP_DROPDOWN_SUCCESS";
export const GET_GROUP_DROPDOWN_FAILED = "GET_GROUP_DROPDOWN_FAILED";
export const GET_PERSON_DROPDOWN_SUCCESS = "GET_PERSON_DROPDOWN_SUCCESS";
export const GET_PERSON_DROPDOWN_FAILED = "GET_PERSON_DROPDOWN_FAILED";

export const CHANGE_PERSON = "CHANGE_PERSON";

type FailedTypes =
  | typeof GET_PERSONS_FAILED
  | typeof POST_PERSON_FAILED
  | typeof SHOW_PERSON_FAILED
  | typeof PUT_PERSON_FAILED
  | typeof GET_GROUP_DROPDOWN_FAILED
  | typeof GET_PERSON_DROPDOWN_FAILED
  | typeof DELETE_PERSON_FAILED;

type LoadingTypes =
  | typeof GET_PERSONS_LOADING
  | typeof POST_PERSON_LOADING
  | typeof SHOW_PERSON_LOADING
  | typeof PUT_PERSON_LOADING
  | typeof DELETE_PERSON_LOADING;

export interface FailedEvents {
  type: FailedTypes;
  message: string;
}

export interface LoadingEvents {
  type: LoadingTypes;
  loadingType: keyof Loadings;
}

export interface GetPersonsSuccess {
  type: typeof GET_PERSONS_SUCCESS;
  persons: PersonTableOptions;
}

export interface PostPersonsSuccess {
  type: typeof POST_PERSON_SUCCESS;
}

export interface ShowPersonsSuccess {
  type: typeof SHOW_PERSON_SUCCESS;
  person: Person;
}

export interface PutPersonsSuccess {
  type: typeof PUT_PERSON_SUCCESS;
}

export interface DeletePersonsSuccess {
  type: typeof DELETE_PERSON_SUCCESS;
  index: number;
}

export interface ChangePerson {
  type: typeof CHANGE_PERSON;
  val: string;
  attr: keyof Person | "initial";
}

export interface GetGroupDropdownSuccess {
  type: typeof GET_GROUP_DROPDOWN_SUCCESS;
  groups: any[];
}

export interface GetPersonDropdownSuccess {
  type: typeof GET_PERSON_DROPDOWN_SUCCESS;
  persons: PersonCleanOption[];
}

export type PersonActions =
  | NotifyActions
  | GetPersonsSuccess
  | PostPersonsSuccess
  | ShowPersonsSuccess
  | PutPersonsSuccess
  | DeletePersonsSuccess
  | FailedEvents
  | LoadingEvents
  | ChangePerson
  | GetPersonDropdownSuccess
  | GetGroupDropdownSuccess;
