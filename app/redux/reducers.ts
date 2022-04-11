/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { reducer as form } from "redux-form/immutable";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router/immutable";
import history from "@utils/history";
import { routerReducer } from "react-router-redux";

import uiReducer from "./modules/ui";
import initval from "./modules/initForm";
import dashboard from "../containers/Pages/Dashboard/reducers/dashboardReducer";
import groups from "../containers/Pages/Groups/reducers/groupReducer";
import createOrganization from "../containers/Pages/CreateOrganization/reducers/createOrganizationReducer";
import node from "../containers/Pages/Nodes/reducers/nodeReducer";
import relationship from "../containers/Pages/Relationships/reducers/relationshipReducer";
import attribute from "../containers/Pages/Attributes/reducers/attributeReducer";
import conditions from "../containers/Pages/Conditions/reducers/conditionReducer";
import output from "../containers/Pages/Outputs/reducers/outputReducer";
import alert from "../containers/Pages/Alerts/reducers/alertReducer";
import timeline from "../containers/Pages/Timelines/reducers/timelineReducer";
import person from "../containers/Pages/Persons/reducers/personReducer";
import document from "../containers/Pages/Documents/reducers/documentReducer";
import workspace from "../containers/Pages/Workspaces/reducers/workspaceReducer";
import tags from "../components/Tags/reducers/tagsReducer";
import lookup from "../containers/Pages/Lookup/reducers/lookupReducer";

import { IImmutableTagState } from "@customTypes/reducers/tags";
import { IImmutableAlertState } from "@customTypes/reducers/alert";
import { IImmutableAttributState } from "@customTypes/reducers/attribute";
import { IImmutableConditionState } from "@customTypes/reducers/conditions";
import { IImmutableDashboardState } from "@customTypes/reducers/dashbord";
import { IImmutableGroupState } from "@customTypes/reducers/groups";
import { IImmutableNodeState } from "@customTypes/reducers/node";
import { IImmutableOutputState } from "@customTypes/reducers/output";
import { IImmutableRelationshipState } from "@customTypes/reducers/relationship";
import { IImmutableWorkspaceState } from "@customTypes/reducers/workspace";
import { IImmutableTimelineState } from "@customTypes/reducers/timeline";
import { IImmutableLookupState } from "@customTypes/reducers/lookup";

// The top-level state object
export interface ApplicationState {
  dashboard: IImmutableDashboardState;
  attribute: IImmutableAttributState;
  node: IImmutableNodeState;
  relationship: IImmutableRelationshipState;
  workspace: IImmutableWorkspaceState;
  conditions: IImmutableConditionState;
  output: IImmutableOutputState;
  alert: IImmutableAlertState;
  person: any;
  timeline: IImmutableTimelineState;
  document: any;
  lookup: IImmutableLookupState;
  createOrganization: any;
  form: any;
  ui: any;
  initval: any;
  groups: IImmutableGroupState;
  tags: IImmutableTagState;
  router: routerReducer;
}

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */

const rootReducer = combineReducers<ApplicationState>({
  dashboard,
  attribute,
  node,
  relationship,
  workspace,
  conditions,
  output,
  alert,
  lookup,
  person,
  timeline,
  document,
  createOrganization,
  form,
  ui: uiReducer,
  initval,
  groups,
  // @ts-ignore
  tags,
  router: connectRouter(history),
});

export default rootReducer;
