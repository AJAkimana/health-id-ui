import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthContainer from './authentication/Container';
import StepperNav from './setup/Stepper';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={AuthContainer} />
      <Route exact path="/login" component={AuthContainer} />
      <Route exact path="/setup" component={StepperNav} />
    </Switch>
  </div>
);

export default App;
