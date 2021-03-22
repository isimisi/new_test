import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { ThemeContext } from './ThemeWrapper';
import Dashboard from '../Templates/Dashboard';
import {
  PersonalDashboard, TaskBoard,
  Invoice, Pricing, Error, Settings,
  HelpSupport, NotFound, Workspaces, Workspace,
  Conditions, Condition
} from '../pageListAsync';

function Application(props) {
  const { history } = props;
  const changeMode = useContext(ThemeContext);

  return (
    <Dashboard history={history} changeMode={changeMode}>
      <Switch>
        { /* Home */ }
        <Route exact path="/app" component={PersonalDashboard} />
        <Route exact path="/app/output" component={PersonalDashboard} />
        <Route exact path="/app/alerts" component={PersonalDashboard} />
        <Route exact path="/app/attributes" component={PersonalDashboard} />
        <Route exact path="/app/relationships" component={PersonalDashboard} />
        <Route exact path="/app/conditions" component={Conditions} />
        <Route exact path="/app/conditions/:id" component={Condition} />
        <Route exact path="/app/groups" component={PersonalDashboard} />
        <Route exact path="/app/nodes" component={PersonalDashboard} />
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

Application.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Application;
