import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthContainer from './authentication/Container';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={AuthContainer} />
      <Route exact path="/login" component={AuthContainer} />
      <Route exact path="/setup" />
    </Switch>
  </div>
);

export default App;
