import React from "react";
import { Switch, Route } from "react-router-dom";
import Outer from "../Templates/Outer";
import { PublicWorkspace, KoncernDiagram } from "../pageListAsync";

const PublicRoutes = () => (
  <Outer>
    <Switch>
      <Route path="/public/workspace/:id" component={PublicWorkspace} />
      <Route path="/public/koncerndiagrammer/:id" component={KoncernDiagram} />
    </Switch>
  </Outer>
);

export default PublicRoutes;
