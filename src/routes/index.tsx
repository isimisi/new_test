import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import DragAndDrop from '../pages/DragAndDrop';

const Routes = () => {
  return (
    <Switch>
      <Route path="/signIn" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/" component={DragAndDrop} />

      {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
      <Route component={SignIn} />
    </Switch>
  );
};

export default Routes;
