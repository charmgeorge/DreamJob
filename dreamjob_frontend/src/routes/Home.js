import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom'
import {newUser} from '../actions/actions';
import userStore from '../stores/UserStore';
// import '../App.css'


class Home extends Component {

  render() {
    return (
      <div>
        <h1>Welcome To Dream Job</h1>
        <h2>where the dream jobs go.... to become yours</h2>
        <Link to='/register'><button className='btn-primary'>Register</button></Link>

      </div>
    );
  }
}

export default Home;
