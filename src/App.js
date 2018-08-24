import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { keycloak } from './auth';
import keycloakInit from './auth';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refesh: false
    }
  }

  componentDidMount() {
    keycloakInit();
  }


  loginSystem() {
    keycloak.login();
  }
  logoutSystem() {
    keycloak.logout();
  }
  getSystemToken() {
    keycloak.updateToken();
    console.log('刷新token keycloak>', keycloak.token)
    this.setState({
      refesh: !this.state.refesh
    })
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h2>{keycloak.token}</h2>
        <button onClick={() => { this.loginSystem() }}>Login</button>
        <button onClick={() => { this.logoutSystem() }}>Logout</button>
        <button onClick={() => { this.getSystemToken() }}>get token</button>
      </div>
    );
  }
}

export default App;
