import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import {newUser} from '../actions/actions';
import userStore from '../stores/UserStore';
// import '../App.css'


class Home extends Component {

  render() {
    return (
      <div>
        <h1>Hello, Bradito</h1>
        
      </div>
    );
  }
}

export default Home;
