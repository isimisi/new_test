import React, { useContext, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { ReactFlowProvider } from "react-flow-renderer";
import { ThemeContext } from "./ThemeWrapper";
import Dashboard from "../Templates/Dashboard";
import {
  PersonalDashboard,
  Error,
  Settings,
  HelpSupport,
  NotFound,
  Workspaces,
  Workspace,
  Persons,
  Person,
  Documents,
  Document,
  Timelines,
  Timeline,
  Conditions,
  Condition,
  Outputs,
  Output,
  Nodes,
  Node,
  Groups,
  Alerts,
  Alert,
  Relationships,
  Relationship,
  Attributes,
  ChoosePlan,
  WorkspaceAnalysis,
  ChangeAvatar,
  Lookup,
  LookupDetails
} from "../pageListAsync";
import { useAuth0 } from "@auth0/auth0-react";
import { UserMeta } from "@helpers/userInfo";

function Application() {
  const history = useHistory();
  const changeMode = useContext(ThemeContext);
  const { user } = useAuth0();

  useEffect(() => {
    const meta: UserMeta = user && user["https://juristic.io/meta"];
    const { type } = meta.dbUser;

    if (type === "client") {
      localStorage.clear();
    }
  }, []);

  return (
    <Dashboard history={history} changeMode={changeMode}>
      <Switch>
        {/* Home */}
        <Route exact path="/app" component={PersonalDashboard} />
        <Route exact path="/app/avatar" component={ChangeAvatar} />

        <Route exact path="/app/lookup" component={Lookup} />
        <Route exact path="/app/lookup/:id" component={LookupDetails} />

        <Route exact path="/app/outputs" component={Outputs} />
        <Route exact path="/app/outputs/:id" component={Output} />
        <Route exact path="/app/red flags" component={Alerts} />
        <Route exact path="/app/red flags/:id" component={Alert} />
        <Route exact path="/app/attributes" component={Attributes} />
        <Route exact path="/app/relationships" component={Relationships} />
        <Route exact path="/app/relationships/:id" component={Relationship} />

        <Route exact path="/app/documents" component={Documents} />
        <Route exact path="/app/documents/:id" component={Document} />
        <Route exact path="/app/persons" component={Persons} />
        <Route exact path="/app/persons/:id" component={Person} />

        <Route exact path="/app/conditions" component={Conditions} />

        <Route exact path="/app/conditions/:id">
          <ReactFlowProvider>
            <Condition />
          </ReactFlowProvider>
        </Route>
        <Route exact path="/app/timelines" component={Timelines} />

        <Route exact path="/app/timelines/:id">
          <ReactFlowProvider>
            <Timeline />
          </ReactFlowProvider>
        </Route>
        <Route exact path="/app/groups" component={Groups} />
        <Route exact path="/app/nodes" component={Nodes} />
        <Route exact path="/app/nodes/:id" component={Node} />
        <Route exact path="/app/workspaces" component={Workspaces} />
        <Route
          exact
          path="/app/workspaces/analysis/:id"
          component={WorkspaceAnalysis}
        />
        <Route exact path="/app/workspaces/:id">
          <ReactFlowProvider>
            <Workspace />
          </ReactFlowProvider>
        </Route>
        <Route exact path="/app/settings" component={Settings} />
        <Route exact path="/app/plan" component={ChoosePlan} />
        <Route path="/app/not-found" component={NotFound} />
        <Route path="/app/error" component={Error} />
        <Route path="/app/help-support" component={HelpSupport} />
        <Route component={NotFound} />
      </Switch>
    </Dashboard>
  );
}

export default Application;
