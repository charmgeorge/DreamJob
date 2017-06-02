import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './components/Register';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <Register />
      </div>
    );
  }
}

export default App;
