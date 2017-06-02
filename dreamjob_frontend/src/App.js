import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import addJob from './components/addJob'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Dream Job</h2>
        </div>
        <Router>
          <div>
            <Route exact path = '/addJob' component={addJob}></Route>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
