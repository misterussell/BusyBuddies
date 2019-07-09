import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  Home,
  MyAccount,
  SignUp,
  SignIn,
} from './components';

const Routes = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/myaccount" render={() => <MyAccount />} />
      <Route path="/signup" render={() => <SignUp user={props.store.user} />} />
      <Route path="/signin" render={() => <SignIn user={props.store.user} />} />
    </Switch>
  );
};

export default Routes;
