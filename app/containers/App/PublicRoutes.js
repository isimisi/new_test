import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Outer from '../Templates/Outer';
import {
  PublicWorkspace,
} from '../pageListAsync';

const PublicRoutes = () => (
  <Outer>
    <Switch>
      <Route path="/public/workspace/:id" component={PublicWorkspace} />
    </Switch>
  </Outer>
);

export default PublicRoutes;
