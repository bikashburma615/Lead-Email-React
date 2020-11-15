import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Nav from './layout/Nav';

import './App.css';
import Routes from './Routes';

function App() {
  return <React.Fragment>
    <Router>
      <Nav/>
      <Routes />
    </Router>
  </React.Fragment>
}

export default App;
