/* eslint-disable react/prop-types */
import * as React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';
import { isAuthenticated } from '@api/constants';


const PrivateRoute = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) => (isAuthenticated()
      ? children
      : (
        <Redirect to={{
          pathname: '/login',
          state: { from: location }
        }}
        />
      ))}
  />
);

export default PrivateRoute;
