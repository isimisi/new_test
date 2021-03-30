/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import history from 'utils/history';

import languageProviderReducer from 'containers/LanguageProvider/reducer';
import uiReducer from './modules/ui';
import initval from './modules/initForm';
import login from './modules/login';
import taskboard from '../containers/pages/TaskBoard/reducers/taskboardReducer';


import auth from '../containers/Pages/Users/reducers/authReducer';
import groups from '../containers/Pages/Groups/reducers/ecommerceReducer';
import createOrganization from '../containers/Pages/CreateOrganization/reducers/createOrganizationReducer';


/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer() {
  const rootReducer = combineReducers({
    auth,
    createOrganization,
    form,
    ui: uiReducer,
    initval,
    login,
    taskboard,
    groups,
    language: languageProviderReducer,
    router: connectRouter(history)
  });

  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}
