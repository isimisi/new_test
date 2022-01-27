import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { NotFound } from "../pageListAsync";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import PublicRoutes from "./PublicRoutes";
import Application from "./Application";
import ThemeWrapper from "./ThemeWrapper";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "@components/Loading/LongLoader";

// @ts-ignore
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const App = () => {
  const {
    user,
    loginWithRedirect,
    isAuthenticated,
    isLoading,
    error
  } = useAuth0();
  console.log({ user, loginWithRedirect, isAuthenticated, isLoading, error });
  if (error) {
    return (
      <div>
        Oops...
        {error.message}
      </div>
    );
  }

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    <ThemeWrapper>
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            isAuthenticated ? <Redirect to="/app" /> : loginWithRedirect()
          }
        />
        <PrivateRoute path="/app">
          <Application />
        </PrivateRoute>
        <PublicRoute path="/public">
          <PublicRoutes />
        </PublicRoute>
        <Route component={NotFound} />
      </Switch>
    </ThemeWrapper>
  );
};

export default App;
