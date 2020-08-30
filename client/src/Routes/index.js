import React from 'react';
import Login from '../Components/loginin';
import Tasks from '../Components/Tasks';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
export default function index() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/tasks' component={Tasks} />
        {/* <Route path='*' component={Login} /> */}
      </Switch>
    </Router>
  );
}
