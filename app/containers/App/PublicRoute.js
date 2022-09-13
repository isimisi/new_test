/* eslint-disable react/prop-types */
import * as React from 'react';
import {
  Route,
} from 'react-router-dom';

function PublicRoute({ children, ...rest }) {
  return <Route
    {...rest}
    render={() => children}
  />;
}

export default PublicRoute;
