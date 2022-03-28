import { fromJS, List } from "immutable";
import { CLOSE_NOTIF } from "@redux/constants/notifConstants";
import {
  GET_ALERTS_SUCCESS,
  GET_ALERTS_FAILED,
  POST_ALERT_SUCCESS,
  POST_ALERT_FAILED,
  SHOW_ALERT_SUCCESS,
  SHOW_ALERT_FAILED,
  PUT_ALERT_SUCCESS,
  PUT_ALERT_FAILED,
  DELETE_ALERT_SUCCESS,
  DELETE_ALERT_FAILED,
  TITLE_CHANGE,
  DESCRIPTION_CHANGE,
  ADD_GROUP,
  GET_GROUP_DROPDOWN_SUCCESS,
  GET_GROUP_DROPDOWN_FAILED,
  GET_CONDITION_DROPDOWN_SUCCESS,
  GET_CONDITION_DROPDOWN_FAILED,
  ALERT_ADD_CONDITION,
  ALERT_CHANGE_CONDITION,
  ALERT_DELETE_CONDITION,
  CHANGE_TAGS,
  AlertActions,
} from "./alertConstants";
import { AlertState, IImmutableAlertState } from "@customTypes/reducers/alert";

const initialState: AlertState = {
  alerts: List(),
  title: "",
  description: "",
  group: "",
  alertConditions: List(),
  message: "",
  groupsDropDownOptions: List(),
  conditionsDropDownOptions: List(),
  alertTags: List(),
};

const initialImmutableState: IImmutableAlertState = fromJS(initialState);

export default function reducer(
  state = initialImmutableState,
  action: AlertActions
): IImmutableAlertState {
  switch (action.type) {
    case GET_ALERTS_SUCCESS:
      return state.withMutations((mutableState) => {
        const alerts = fromJS(action.alerts);
        mutableState.set("alerts", alerts);
      });
    case GET_ALERTS_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case POST_ALERT_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set("title", "");
        mutableState.set("description", "");
        mutableState.set("group", "");
        mutableState.set("alertConditions", List());
      });
    case POST_ALERT_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case SHOW_ALERT_SUCCESS:
      return state.withMutations((mutableState) => {
        const title = fromJS(action.title);
        const description = fromJS(action.description);
        const group = fromJS(action.group);
        const conditions = fromJS(action.conditions);
        const tags = fromJS(action.tags);
        mutableState.set("title", title);
        mutableState.set("description", description);
        mutableState.set("group", group);
        mutableState.set("alertConditions", conditions);
        mutableState.set("alertTags", tags);
      });
    case SHOW_ALERT_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case PUT_ALERT_SUCCESS:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case PUT_ALERT_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case DELETE_ALERT_SUCCESS:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case DELETE_ALERT_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case GET_CONDITION_DROPDOWN_SUCCESS:
      return state.withMutations((mutableState) => {
        const conditionsDropDownOptions = fromJS(action.conditions);
        mutableState.set("conditionsDropDownOptions", conditionsDropDownOptions);
      });
    case GET_CONDITION_DROPDOWN_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case GET_GROUP_DROPDOWN_SUCCESS:
      return state.withMutations((mutableState) => {
        const groupsDropDownOptions = fromJS(action.groups);
        mutableState.set("groupsDropDownOptions", groupsDropDownOptions);
      });
    case GET_GROUP_DROPDOWN_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case TITLE_CHANGE:
      return state.withMutations((mutableState) => {
        const title = fromJS(action.title);
        mutableState.set("title", title);
      });
    case DESCRIPTION_CHANGE:
      return state.withMutations((mutableState) => {
        const description = fromJS(action.description);
        mutableState.set("description", description);
      });
    case ADD_GROUP:
      return state.withMutations((mutableState) => {
        const group = fromJS(action.group);
        mutableState.set("group", group);
      });
    case ALERT_ADD_CONDITION:
      return state.withMutations((mutableState) => {
        const condition = fromJS(action.condition);
        // @ts-ignore
        mutableState.update("alertConditions", (list) => list.push(condition));
      });
    case ALERT_CHANGE_CONDITION:
      return state.withMutations((mutableState) => {
        // @ts-ignore
        const conditions = mutableState.get("alertConditions").toJS();

        let condition = conditions.find((cond) => !cond.label);

        if (action.index || action.index === 0) {
          const index = conditions.findIndex((c, i) => i === action.index);
          condition = conditions[index];
        }

        condition.label = action.condition.value;
        condition.condition_id = action.condition.id;

        mutableState.set("alertConditions", fromJS(conditions));
      });
    case ALERT_DELETE_CONDITION:
      return state.withMutations((mutableState) => {
        mutableState.update("alertConditions", (list) =>
          // @ts-ignore
          list.filter((l, i) => i !== action.index)
        );
      });
    case CHANGE_TAGS:
      return state.withMutations((mutableState) => {
        const tags = fromJS(action.tags);
        mutableState.set("alertTags", tags);
      });
    case CLOSE_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set("message", "");
      });
    default:
      return state;
  }
}
