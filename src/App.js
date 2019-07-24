import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Nav } from './components';

import Routes from './Routes';

import Store from './Store';

import './App.css';

const store = new Store();
store.user.getSession().then(result => {
  console.log(store.user);
  console.log(result);
}).catch(error => console.log(error));

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
