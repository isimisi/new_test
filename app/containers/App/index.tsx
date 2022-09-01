import React from "react";
import { Switch, Route, Redirect, Router } from "react-router-dom";

import { NotFound } from "../pageListAsync";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import PublicRoutes from "./PublicRoutes";
import Application from "./Application";
import ThemeWrapper from "./ThemeWrapper";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "@components/Loading/LongLoader";
import ErrorView from "@components/Error/CrashScreen";

// @ts-ignore
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

interface Props {
  history: any;
}

function App(props: Props) {
  const { loginWithRedirect, isAuthenticated, isLoading, error } = useAuth0();
  const { history } = props;

  if (error) {
    return (
      <ErrorView
        error={error}
        clearError={() =>
          window.location.replace("https://app.juristic.io/app")}
      />
    );
  }

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#F3F5F8",
          position: "absolute",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <ThemeWrapper>
      <Router history={history}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/app" />} />
          <PrivateRoute path="/app">
            <Application />
          </PrivateRoute>
          <PublicRoute path="/public">
            <PublicRoutes />
          </PublicRoute>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ThemeWrapper>
  );
}

export default App;
