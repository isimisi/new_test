/* eslint-disable react/prop-types */
import * as React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';
import { loadFromLocalStorage } from '@api/localStorage/localStorage';

const PrivateRoute = ({ children, ...rest }) => {
  const tokenMatch = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]*$/;
  const { token } = loadFromLocalStorage();
  const isAuthenticated = tokenMatch.test(token);

  return (
    <Route
      {...rest}
      render={({ location }) => (isAuthenticated
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
};

export default PrivateRoute;
