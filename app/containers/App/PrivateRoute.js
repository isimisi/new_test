/* eslint-disable react/prop-types */
import * as React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, ...rest }) => {
  const reducer = 'auth';
  const isAuthenticated = useSelector(state => state.getIn([reducer, 'isAuthenticated']));

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
