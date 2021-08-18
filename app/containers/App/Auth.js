import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Outer from '../Templates/Outer';
import {
  Login,
  Register,
  ResetPassword,
  NewPassword,
  ComingSoon,
  NotFound,
  ChoosePlanFront
} from '../pageListAsync';

console.log('hej fra auth');

function Auth() {
  return (
    <Outer>
      <Switch>
        <Route path="/plan" component={ChoosePlanFront} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/new-password/:id" component={NewPassword} />
        <Route path="/coming-soon" component={ComingSoon} />
        <Route component={NotFound} />
      </Switch>
    </Outer>
  );
}

export default Auth;
