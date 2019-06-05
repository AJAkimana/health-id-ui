import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthContainer from './authentication/Container';
import ResetPassword from './authentication/PasswordReset';
import StepperNav from './setup/Stepper';
import Dashboard from './shared/Dashboard/Dashboard';
import Products from './products/productsTable';

const App = ({ session }) => (
  <div>
    <Switch>
      <Route exact path="/" component={AuthContainer} />
      <Route exact path="/login" component={AuthContainer} />
      <Route exact path="/setup" component={StepperNav} />
      <Route exact path="/dashboard" render={() => <Dashboard session={session} />} />
      <Route exact path="/reset_password/:uid65/:token" component={ResetPassword} />
      <Route exact path="/products" render={() => <Products session={session} />} />
    </Switch>
  </div>
);

export default App;
