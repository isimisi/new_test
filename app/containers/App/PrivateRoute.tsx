/* eslint-disable indent */
/* eslint-disable react/prop-types */
import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loader from "@components/Loading/LongLoader";

function PrivateRoute({ children, ...rest }) {
  return <Route {...rest} render={() => children} />;
}

export default withAuthenticationRequired(PrivateRoute, {
  onRedirecting: () => <Loader />
});
