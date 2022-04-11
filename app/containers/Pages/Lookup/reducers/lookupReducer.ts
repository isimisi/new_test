import { LookupState, IImmutableLookupState } from "@customTypes/reducers/lookup";
import { fromJS, List, Map } from "immutable";
import {
  GET_COMPANIES_FAILED,
  GET_COMPANIES_LOADING,
  GET_COMPANIES_SUCCESS,
  GET_COMPANY_LOADING,
  GET_COMPANY_SUCCESS,
  GET_COMPANY_FAILED,
  LookupActions,
} from "./lookupConstants";

const initialState: LookupState = {
  lookups: List(),
  loading: false,
  message: "",
  company: Map(),
};

const initialImmutableState: IImmutableLookupState = fromJS(initialState);

export default function reducer(
  state = initialImmutableState,
  action: LookupActions
): IImmutableLookupState {
  switch (action.type) {
    case GET_COMPANIES_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set("loading", true);
      });
    case GET_COMPANIES_SUCCESS:
      return state.withMutations((mutableState) => {
        const lookups = fromJS(action.lookups);
        mutableState.set("lookups", lookups);
        mutableState.set("loading", false);
      });
    case GET_COMPANIES_FAILED:
      return state.withMutations((mutableState) => {
        mutableState.set("loading", false);
      });
    case GET_COMPANY_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set("loading", true);
      });
    case GET_COMPANY_SUCCESS:
      return state.withMutations((mutableState) => {
        const company = fromJS(action.company);
        mutableState.set("company", company);
        mutableState.set("loading", false);
      });
    case GET_COMPANY_FAILED:
      return state.withMutations((mutableState) => {
        mutableState.set("loading", false);
      });
    default:
      return state;
  }
}
