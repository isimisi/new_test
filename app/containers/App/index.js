import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from 'containers/Pages/NotFound/NotFound';
import { isAuthenticated } from '@api/constants';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import PublicRoutes from './PublicRoutes';
import Auth from './Auth';
import Application from './Application';
import ThemeWrapper from './ThemeWrapper';
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

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
      <PublicRoute path="/public">
        <PublicRoutes />
      </PublicRoute>
      <Route component={Auth} />
      <Route component={NotFound} />
    </Switch>
  </ThemeWrapper>
);

export default App;
