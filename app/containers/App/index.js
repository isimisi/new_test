import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from 'containers/Pages/NotFound/NotFound';
import { isAuthenticated, getStatus } from '@api/constants';
import PrivateRoute from './PrivateRoute';
import Auth from './Auth';
import Application from './Application';
import ThemeWrapper from './ThemeWrapper';
import {
  ConfirmEmail
} from '../pageListAsync';
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const status = getStatus();

const App = () => (
  <ThemeWrapper>
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          isAuthenticated()
            ? <Redirect to="/app" />
            : <Redirect to="/login" />
        )}
      />
      <PrivateRoute path="/app">
        <Application />
      </PrivateRoute>
      <Route component={Auth} />
      <Route component={NotFound} />
    </Switch>
  </ThemeWrapper>
);

export default App;
