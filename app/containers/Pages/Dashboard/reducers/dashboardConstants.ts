import { elementCount, Timeline } from "@customTypes/reducers/dashbord";
import { NotifyActions } from "@redux/constants/notifConstants";

export const GET_ELEMET_COUNTS_SUCCESS = "GET_ELEMET_COUNTS_SUCCESS";
export const GET_ELEMET_COUNTS_FAILED = "GET_ELEMET_COUNTS_FAILED";

export const GET_TIMELINE_SUCCESS = "GET_TIMELINE_SUCCESS";
export const GET_TIMELINE_FAILED = "GET_TIMELINE_FAILED";

export const POST_FEATURE_SUCCESS = "POST_FEATURE_SUCCESS";
export const POST_FEATURE_FAILED = "POST_FEATURE_FAILED";

export const RUN_INTRO = "RUN_INTRO";
export const CHANGE_STEP_INDEX = "CHANGE_STEP_INDEX";

export const GET_NOTIFICATIONS_SUCCESS = "GET_NOTIFICATIONS_SUCCESS";
export const GET_NOTIFICATIONS_FAILED = "GET_NOTIFICATIONS_FAILED";

export const POST_NOTIFICATIONS_FAILED = "POST_NOTIFICATIONS_FAILED";

export const READ_NOTIFICATIONS_SUCCESS = "READ_NOTIFICATIONS_SUCCESS";

export const CHANGE_TYPE = "CHANGE_TYPE";

export interface GetElementCountsSuccess {
  type: typeof GET_ELEMET_COUNTS_SUCCESS;
  elementCounts: elementCount[];
}
export interface GetElementCountsFailed {
  type: typeof GET_ELEMET_COUNTS_FAILED;
  message: string;
}

export interface GetTimelineSuccess {
  type: typeof GET_TIMELINE_SUCCESS;
  timeline: Timeline[];
}

export interface GetTimelineFailed {
  type: typeof GET_TIMELINE_FAILED;
  message: string;
}

export interface PostFeatureSuccess {
  type: typeof POST_FEATURE_SUCCESS;
  message: string;
}

export interface PostFeatureFailed {
  type: typeof POST_FEATURE_FAILED;
  message: string;
}

export interface RunIntro {
  type: typeof RUN_INTRO;
  run: any; // TODO:
}

export interface ChangeStepIndex {
  type: typeof CHANGE_STEP_INDEX;
  index: any; // TODO:
}

export interface GetNotificationsSuccess {
  type: typeof GET_NOTIFICATIONS_SUCCESS;
  notifications: any;
}

export interface GetNotificationsFailed {
  type: typeof GET_NOTIFICATIONS_FAILED;
  message: string;
}

export interface PostNotificationsFailed {
  type: typeof POST_NOTIFICATIONS_FAILED;
  message: string;
}

export interface ReadNotificationsSuccess {
  type: typeof READ_NOTIFICATIONS_SUCCESS;
  id: number;
}

export interface ChangeType {
  type: typeof CHANGE_TYPE;
  dashboardType: "structure" | "timeline" | "intro";
}

export type DashboardActions =
  | GetElementCountsSuccess
  | GetElementCountsFailed
  | GetTimelineSuccess
  | GetTimelineFailed
  | PostFeatureSuccess
  | PostFeatureFailed
  | RunIntro
  | ChangeType
  | ChangeStepIndex
  | GetNotificationsSuccess
  | GetNotificationsFailed
  | PostNotificationsFailed
  | ReadNotificationsSuccess
  | NotifyActions;
