import { PersonState, IImmutablePersonState, Person } from "@customTypes/reducers/person";
import { CLOSE_NOTIF, SHOW_NOTIF } from "@redux/constants/notifConstants";
import { fromJS, List, Map } from "immutable";
import {
  DELETE_PERSON_FAILED,
  DELETE_PERSON_SUCCESS,
  GET_PERSONS_FAILED,
  GET_PERSONS_LOADING,
  GET_PERSONS_SUCCESS,
  PersonActions,
  POST_PERSON_FAILED,
  POST_PERSON_LOADING,
  POST_PERSON_SUCCESS,
  PUT_PERSON_FAILED,
  PUT_PERSON_LOADING,
  PUT_PERSON_SUCCESS,
  SHOW_PERSON_FAILED,
  SHOW_PERSON_LOADING,
  SHOW_PERSON_SUCCESS,
  CHANGE_PERSON,
  GET_GROUP_DROPDOWN_FAILED,
  GET_GROUP_DROPDOWN_SUCCESS,
  GET_PERSON_DROPDOWN_SUCCESS,
  GET_PERSON_DROPDOWN_FAILED,
} from "./personConstants";

const initialLoadings = Map({
  main: false,
  post: false,
});

const initialPerson: Person = {
  id: null,
  name: null,
  person_icon: null,
  company: null,
  affiliation: null,
  email: null,
  phone: null,
  description: null,
  address: null,
  organization_id: null,
  group_id: null,
  created_at: null,
  updated_at: null,
  group: null,
  tags: List(),
};

const initialState: PersonState = {
  persons: List(),
  loadings: initialLoadings,
  person: Map(initialPerson),
  message: "",
  personOptions: List(),
  groupsDropDownOptions: List(),
};

const initialImmutableState: IImmutablePersonState = fromJS(initialState);

export default function reducer(
  state = initialImmutableState,
  action: PersonActions
): IImmutablePersonState {
  switch (action.type) {
    case GET_PERSONS_SUCCESS:
      return state.withMutations((mutableState) => {
        const persons = fromJS(action.persons);
        mutableState.set("persons", persons);
        mutableState.setIn(["loadings", "main"], false);
      });
    case POST_PERSON_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.setIn(["loadings", "post"], false);
      });
    case PUT_PERSON_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.setIn(["loadings", "post"], false);
      });
    case SHOW_PERSON_SUCCESS:
      return state.withMutations((mutableState) => {
        const person = fromJS(action.person);
        mutableState.set("person", person);
        mutableState.setIn(["loadings", "main"], false);
      });
    case DELETE_PERSON_SUCCESS:
      return state.withMutations((mutableState) => {
        // @ts-ignore
        mutableState.update("persons", (list) => list.remove(action.index));
      });
    case GET_PERSONS_LOADING:
    case POST_PERSON_LOADING:
    case PUT_PERSON_LOADING:
    case SHOW_PERSON_LOADING:
      return state.withMutations((mutableState) => {
        const loadingType = action.loadingType;
        mutableState.setIn(["loadings", loadingType], true);
      });
    case GET_PERSONS_FAILED:
    case POST_PERSON_FAILED:
    case PUT_PERSON_FAILED:
    case SHOW_PERSON_FAILED:
    case GET_GROUP_DROPDOWN_FAILED:
    case GET_PERSON_DROPDOWN_FAILED:
    case DELETE_PERSON_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
        mutableState.set("loadings", initialLoadings);
      });
    case CHANGE_PERSON:
      return state.withMutations((mutableState) => {
        if (action.attr === "initial") {
          mutableState.set("person", Map(initialPerson));
        }
        mutableState.setIn(["person", action.attr], action.val);
      });
    case GET_GROUP_DROPDOWN_SUCCESS:
      return state.withMutations((mutableState) => {
        const groupsDropDownOptions = fromJS(action.groups);
        mutableState.set("groupsDropDownOptions", groupsDropDownOptions);
      });
    case GET_PERSON_DROPDOWN_SUCCESS:
      return state.withMutations((mutableState) => {
        const personOptions = fromJS(action.persons);
        mutableState.set("personOptions", personOptions);
      });
    case SHOW_NOTIF:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case CLOSE_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set("message", "");
      });
    default:
      return state;
  }
}
