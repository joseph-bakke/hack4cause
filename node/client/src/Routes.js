import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import App from './App';
import {HomePage} from './views/Home';
import {AboutPage} from './views/About';
import MapPage from './views/Map';
import CategoryPage from './views/CategoryPage';
import {WeatherPage} from './views/Weather';

console.log(MapPage);

const Routes = (
      <Router history={browserHistory}>
        <Route path='/' component={App} >
            <IndexRoute title="Home" component={HomePage} />
            <Route path='/about' component={AboutPage} />
            <Route path='/category/:categoryid' component={CategoryPage}/>
            <Route path='/map' component={MapPage} />
            <Route path='/weather' component={WeatherPage} />
        </Route>
      </Router>
);

export default Routes;