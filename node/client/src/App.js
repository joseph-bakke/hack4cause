import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import { Dashboard, Header, Sidebar } from 'react-adminlte-dash';
import MapDisplay from './views/Map';

class App extends Component {
  navItems() {
    return (
      <Header.Item href="/some/link" key="1" />
    );
  }
  sidebarItems(){
    return(
      <Sidebar.Menu header="NAVIGATION" key="1">
        <Link to="/"><Sidebar.Menu.Item title="Home"/></Link>
        <Link to="/about"><Sidebar.Menu.Item title="About"/></Link>
      </Sidebar.Menu>
    );
  }
  render() {
    return (
        <Dashboard
        navbarChildren={this.navItems()}
        sidebarChildren={this.sidebarItems()}
        logoLg={<span><b>Eugene</b>Dashboard</span>}
        logoSm={<span><b>E</b>UG</span>}
        theme="skin-green">
          {this.props.children}
      </Dashboard>
    );
  }

}

export default App



