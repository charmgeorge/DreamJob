import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RegisterUser from './routes/RegisterUser';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <RegisterUser />
        {/* <Router>
          <Route to="/register" component={RegisterUser}></Route>
        </Router> */}

      </div>
    );
  }
}

export default App;
