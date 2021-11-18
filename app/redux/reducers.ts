/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router/immutable';
import history from '@utils/history';

import uiReducer from './modules/ui';
import initval from './modules/initForm';
import languageProviderReducer from '../containers/LanguageProvider/reducer';
import dashboard from '../containers/Pages/Dashboard/reducers/dashboardReducer';
import auth from '../containers/Pages/Users/reducers/authReducer';
import groups from '../containers/Pages/Groups/reducers/groupReducer';
import createOrganization from '../containers/Pages/CreateOrganization/reducers/createOrganizationReducer';
import node from '../containers/Pages/Nodes/reducers/nodeReducer';
import relationship from '../containers/Pages/Relationships/reducers/relationshipReducer';
import attribute from '../containers/Pages/Attributes/reducers/attributeReducer';
import conditions from '../containers/Pages/Conditions/reducers/conditionReducer';
import output from '../containers/Pages/Outputs/reducers/outputReducer';
import alert from '../containers/Pages/Alerts/reducers/alertReducer';
import workspace from '../containers/Pages/Workspaces/reducers/workspaceReducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */

const rootReducer = combineReducers({
  dashboard,
  auth,
  attribute,
  node,
  relationship,
  workspace,
  conditions,
  output,
  alert,
  createOrganization,
  form,
  ui: uiReducer,
  initval,
  groups,
  language: languageProviderReducer,
  router: connectRouter(history)
});


export default rootReducer;
