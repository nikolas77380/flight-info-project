import React, { Component } from 'react';
import Auth from './Auth/Auth';
import Dashboard from './Dashboard/Dashboard';
import { Switch, Route } from 'react-router-dom';
import './App.css';

const App = () => (
  <div>
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/" component={Auth} />
    </Switch>
  </div>
);

export default App;
