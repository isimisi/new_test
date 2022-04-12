import { LookupState, IImmutableLookupState } from "@customTypes/reducers/lookup";
import { fromJS, List, Map } from "immutable";
import {
  GET_COMPANIES_FAILED,
  GET_COMPANIES_LOADING,
  GET_COMPANIES_SUCCESS,
  GET_COMPANY_LOADING,
  GET_COMPANY_SUCCESS,
  GET_COMPANY_FAILED,
  MONITOR_COMPANY_LOADING,
  MONITOR_COMPANY_SUCCESS,
  MONITOR_COMPANY_FAILED,
  LookupActions,
} from "./lookupConstants";

const initialState: LookupState = {
  lookups: List(),
  loading: false,
  monitorLoading: false,
  message: "",
  company: Map(),
};

const initialImmutableState: IImmutableLookupState = fromJS(initialState);

export default function reducer(
  state = initialImmutableState,
  action: LookupActions
): IImmutableLookupState {
  switch (action.type) {
    case GET_COMPANIES_SUCCESS:
      return state.withMutations((mutableState) => {
        const lookups = fromJS(action.lookups);
        mutableState.set("lookups", lookups);
        mutableState.set("loading", false);
      });

    case GET_COMPANY_SUCCESS:
      return state.withMutations((mutableState) => {
        const company = fromJS(action.company);
        mutableState.set("company", company);
        mutableState.set("lookups", List());
        mutableState.set("loading", false);
      });
    case MONITOR_COMPANY_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set("monitorLoading", true);
      });
    case MONITOR_COMPANY_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.update("company", (company) =>
          company.update("monitoring", (val) => !val)
        );
        mutableState.set("monitorLoading", false);
      });
    case MONITOR_COMPANY_FAILED:
      return state.withMutations((mutableState) => {
        mutableState.set("monitorLoading", false);
      });
    case GET_COMPANIES_FAILED:
    case GET_COMPANY_FAILED:
      return state.withMutations((mutableState) => {
        mutableState.set("loading", false);
      });
    case GET_COMPANIES_LOADING:
    case GET_COMPANY_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set("loading", true);
      });
    default:
      return state;
  }
}
