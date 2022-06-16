/* eslint-disable no-param-reassign */
import { fromJS } from "immutable";
import { CLOSE_NOTIF } from "@redux/constants/notifConstants";
import {
  GET_ELEMET_COUNTS_SUCCESS,
  GET_ELEMET_COUNTS_FAILED,
  GET_TIMELINE_SUCCESS,
  GET_TIMELINE_FAILED,
  POST_FEATURE_SUCCESS,
  POST_FEATURE_FAILED,
  RUN_INTRO,
  CHANGE_STEP_INDEX,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILED,
  POST_NOTIFICATIONS_FAILED,
  READ_NOTIFICATIONS_SUCCESS,
  DashboardActions,
  CHANGE_TYPE,
} from "./dashboardConstants";
import { DashboardState, IImmutableDashboardState } from "@customTypes/reducers/dashbord";

const initElementCounts = {
  alerts: 0,
  attributes: 0,
  conditions: 0,
  groups: 0,
  nodes: 0,
  outputs: 0,
  relationships: 0,
  workspaces: 0,
};

const initialState: DashboardState = {
  elementCounts: initElementCounts,
  timeline: [],
  message: "",
  runIntro: false,
  introStepIndex: 0,
  notifications: {},
  type: "structure",
};

const initialImmutableState: IImmutableDashboardState = fromJS(initialState);

export default function reducer(
  state = initialImmutableState,
  action: DashboardActions
): IImmutableDashboardState {
  switch (action.type) {
    case GET_ELEMET_COUNTS_SUCCESS:
      return state.withMutations((mutableState) => {
        const elementCounts = fromJS(action.elementCounts);
        mutableState.set("elementCounts", elementCounts);
      });

    case GET_TIMELINE_SUCCESS:
      return state.withMutations((mutableState) => {
        const timeline = fromJS(action.timeline);
        mutableState.set("timeline", timeline);
      });
    case RUN_INTRO:
      return state.withMutations((mutableState) => {
        const run = fromJS(action.run);
        mutableState.set("runIntro", run);
      });
    case CHANGE_STEP_INDEX:
      return state.withMutations((mutableState) => {
        const index = fromJS(action.index);
        mutableState.set("introStepIndex", index);
      });
    case GET_NOTIFICATIONS_SUCCESS:
      return state.withMutations((mutableState) => {
        const notifications = fromJS(action.notifications);
        mutableState.set("notifications", notifications);
      });

    case READ_NOTIFICATIONS_SUCCESS:
      return state.withMutations((mutableState) => {
        const notifications = mutableState.get("notifications").toJS();
        notifications.unread -= 1;
        const currNotif = notifications.notifications.find((x) => x.id === action.id);
        currNotif.read = true;
        mutableState.set("notifications", fromJS(notifications));
      });
    case GET_NOTIFICATIONS_FAILED:
    case POST_NOTIFICATIONS_FAILED:
    case POST_FEATURE_FAILED:
    case GET_TIMELINE_FAILED:
    case GET_ELEMET_COUNTS_FAILED:
    case POST_FEATURE_SUCCESS:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case CHANGE_TYPE:
      return state.withMutations((mutableState) => {
        mutableState.set("type", action.dashboardType);
      });
    case CLOSE_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set("message", "");
      });
    default:
      return state;
  }
}
