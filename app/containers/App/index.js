import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from 'containers/Pages/NotFound/NotFound';
import { useSelector } from 'react-redux';
import Auth from './Auth';
import Application from './Application';
import ThemeWrapper from './ThemeWrapper';
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

function App() {
  const reducer = 'auth';
  const token = useSelector(state => state.getIn([reducer, 'token']));

  // TODO: make this after best practice
  return (
    <ThemeWrapper>
      <Switch>
        {token.length > 0 && <Route path="/app" component={Application} />}
        <Route component={Auth} />
        <Route component={NotFound} />
      </Switch>
    </ThemeWrapper>
  );
}

export default App;
