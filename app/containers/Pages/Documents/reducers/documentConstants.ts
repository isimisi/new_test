import {
  DocumentTableOptions,
  Loadings,
  Document,
  DocumentCleanOption,
} from "@customTypes/reducers/document";

import { NotifyActions } from "@redux/constants/notifConstants";

export const GET_DOCUMENTS_LOADING = "GET_DOCUMENTS_LOADING";
export const GET_DOCUMENTS_SUCCESS = "GET_DOCUMENTS_SUCCESS";
export const GET_DOCUMENTS_FAILED = "GET_DOCUMENTS_FAILED";

export const POST_DOCUMENT_LOADING = "POST_DOCUMENT_LOADING";
export const POST_DOCUMENT_SUCCESS = "POST_DOCUMENT_SUCCESS";
export const POST_DOCUMENT_FAILED = "POST_DOCUMENT_FAILED";

export const SHOW_DOCUMENT_LOADING = "SHOW_DOCUMENT_LOADING";
export const SHOW_DOCUMENT_SUCCESS = "SHOW_DOCUMENT_SUCCESS";
export const SHOW_DOCUMENT_FAILED = "SHOW_DOCUMENT_FAILED";

export const PUT_DOCUMENT_LOADING = "PUT_DOCUMENT_LOADING";
export const PUT_DOCUMENT_SUCCESS = "PUT_DOCUMENT_SUCCESS";
export const PUT_DOCUMENT_FAILED = "PUT_DOCUMENT_FAILED";

export const DELETE_DOCUMENT_LOADING = "DELETE_DOCUMENT_LOADING";
export const DELETE_DOCUMENT_SUCCESS = "DELETE_DOCUMENT_SUCCESS";
export const DELETE_DOCUMENT_FAILED = "DELETE_DOCUMENT_FAILED";

export const GET_GROUP_DROPDOWN_SUCCESS = "GET_GROUP_DROPDOWN_SUCCESS";
export const GET_GROUP_DROPDOWN_FAILED = "GET_GROUP_DROPDOWN_FAILED";
export const GET_DOCUMENT_DROPDOWN_SUCCESS = "GET_DOCUMENT_DROPDOWN_SUCCESS";
export const GET_DOCUMENT_DROPDOWN_FAILED = "GET_DOCUMENT_DROPDOWN_FAILED";

export const CHANGE_DOCUMENT = "CHANGE_DOCUMENT";

type FailedTypes =
  | typeof GET_DOCUMENTS_FAILED
  | typeof POST_DOCUMENT_FAILED
  | typeof SHOW_DOCUMENT_FAILED
  | typeof PUT_DOCUMENT_FAILED
  | typeof GET_GROUP_DROPDOWN_FAILED
  | typeof GET_DOCUMENT_DROPDOWN_FAILED
  | typeof DELETE_DOCUMENT_FAILED;

type LoadingTypes =
  | typeof GET_DOCUMENTS_LOADING
  | typeof POST_DOCUMENT_LOADING
  | typeof SHOW_DOCUMENT_LOADING
  | typeof PUT_DOCUMENT_LOADING
  | typeof DELETE_DOCUMENT_LOADING;

export interface FailedEvents {
  type: FailedTypes;
  message: string;
}

export interface LoadingEvents {
  type: LoadingTypes;
  loadingType: keyof Loadings;
}

export interface GetDocumentSuccess {
  type: typeof GET_DOCUMENTS_SUCCESS;
  documents: DocumentTableOptions;
}

export interface PostDocumentSuccess {
  type: typeof POST_DOCUMENT_SUCCESS;
}

export interface ShowDocumentSuccess {
  type: typeof SHOW_DOCUMENT_SUCCESS;
  document: Document;
}

export interface PutDocumentSuccess {
  type: typeof PUT_DOCUMENT_SUCCESS;
  document: any;
  index: number;
}

export interface DeleteDocumentSuccess {
  type: typeof DELETE_DOCUMENT_SUCCESS;
  index: number;
}

export interface ChangeDocument {
  type: typeof CHANGE_DOCUMENT;
  val: string;
  attr: keyof Document | "initial";
}

export interface GetGroupDropdownSuccess {
  type: typeof GET_GROUP_DROPDOWN_SUCCESS;
  groups: any[];
}

export interface GetDocumentDropdownSuccess {
  type: typeof GET_DOCUMENT_DROPDOWN_SUCCESS;
  documents: DocumentCleanOption[];
}

export type DocumentActions =
  | NotifyActions
  | FailedEvents
  | LoadingEvents
  | ChangeDocument
  | GetDocumentSuccess
  | GetDocumentDropdownSuccess
  | PostDocumentSuccess
  | ShowDocumentSuccess
  | PutDocumentSuccess
  | GetGroupDropdownSuccess
  | DeleteDocumentSuccess;
