import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Nav } from './components';

import Routes from './Routes';

import Store from './Store';

import './App.css';

// initialize store
const store = new Store();

// confirm if there is data in the browser than can authenticate a new session
store.user.getSession().then(result => {
  console.log(store.user);
  console.log(result)
}).catch(error => error);

function App() {
  return (
    <Router>
      <Nav user={store.user} />
      <hr />
      <Routes store={store}/>
    </Router>
  );
}

export default App;
