import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, MyAccount } from './components';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/myaccount" render={() => <MyAccount />} />
    </Switch>
  );
};

export default Routes;
