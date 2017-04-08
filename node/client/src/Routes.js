import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import App from './App';
import {HomePage} from './views/Home';
import {AboutPage} from './views/About';

const Routes = (
      <Router history={browserHistory}>
        <Route path='/' component={App} >
            <IndexRoute title="Home" component={HomePage} />
            <Route path='/about' component={AboutPage} />
        </Route>
      </Router>
);

export default Routes;