import React, { FunctionComponent } from 'react';
import { Router } from 'react-router-dom';
import './App.css';
import history from './services/history';
import Routes from './routes';

const App: FunctionComponent = () => {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
};

export default App;
