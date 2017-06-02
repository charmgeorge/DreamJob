import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RegisterUser from './routes/RegisterUser';
import Home from './routes/Home';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <Router>
          <div>
            <Route exact path="/" component={Home}></Route>
            <Route path="/register" component={RegisterUser}></Route>
          </div>
        </Router>

      </div>
    );
  }
}

export default App;
