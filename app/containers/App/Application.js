import React, { useContext } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { ThemeContext } from './ThemeWrapper';
import Dashboard from '../Templates/Dashboard';
import {
  PersonalDashboard, TaskBoard,
  Invoice, Pricing, Error, Settings,
  HelpSupport, NotFound, Workspaces, Workspace,
  Conditions, Condition, Outputs, Output,
  Nodes, Node, Groups, Alerts, Relationships,
  Attributes
} from '../pageListAsync';

function Application() {
  const history = useHistory();
  const changeMode = useContext(ThemeContext);

  return (
    <Dashboard history={history} changeMode={changeMode}>
      <Switch>
        { /* Home */ }
        <Route exact path="/app" component={PersonalDashboard} />
        <Route exact path="/app/outputs" component={Outputs} />
        <Route exact path="/app/outputs/:id" component={Output} />
        <Route exact path="/app/alerts" component={Alerts} />
        <Route exact path="/app/attributes" component={Attributes} />
        <Route exact path="/app/relationships" component={Relationships} />
        <Route exact path="/app/conditions" component={Conditions} />
        <Route exact path="/app/conditions/:id" component={Condition} />
        <Route exact path="/app/groups" component={Groups} />
        <Route exact path="/app/nodes" component={Nodes} />
        <Route exact path="/app/nodes/:id" component={Node} />
        <Route exact path="/app/workspaces" component={Workspaces} />
        <Route path="/app/workspaces/:id" component={Workspace} />
        <Route exact path="/app/taskboard" component={TaskBoard} />
        <Route exact path="/app/settings" component={Settings} />
        {/* Fremtidig brug */ }
        <Route path="/app/invoice" component={Invoice} />
        <Route path="/app/pricing" component={Pricing} />
        <Route path="/app/not-found" component={NotFound} />
        <Route path="/app/error" component={Error} />
        <Route path="/app/help-support" component={HelpSupport} />
        { /* Default */ }
        <Route component={NotFound} />
      </Switch>
    </Dashboard>
  );
}


export default Application;
