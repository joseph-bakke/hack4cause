import React, { Component } from 'react';
import './App.css';
import { Dashboard, Header, Sidebar } from 'react-adminlte-dash';
import MapDisplay from './views/Map';

class App extends Component {
    navItems() {
        return (
            <Header.Item href="/some/link" key="1"/>
        );
    }

    sidebarItems() {
        return (
            <Sidebar.Menu header="NAVIGATION" key="1">
                <Sidebar.Menu.Item title="Home" href="/"/>
            </Sidebar.Menu>
        );
    }

    render() {
        return (
            <Dashboard
                navbarChildren={this.navItems()}
                sidebarChildren={this.sidebarItems()}
                sidebarMini={true}
                logoLg={<span><b>Eugene</b>Dashboard</span>}
                logoSm={<span><b>E</b>UG</span>}
                theme="skin-blue"
            >
                <MapDisplay />
            </Dashboard>
        );
    }
}

export default App;
