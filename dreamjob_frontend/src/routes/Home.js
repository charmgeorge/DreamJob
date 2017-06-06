import React, { Component } from 'react';
import {BrowserRouter as Link} from 'react-router-dom'


class Home extends Component {

  render() {
    return (
      <div>
        <h1>Hello, Bradito</h1>
        <Link to='/register'><button className='btn-primary'>Register</button></Link>
        <Link to='/login'><button className='btn-primary'>Login</button></Link>
      </div>
    );
  }
}

export default Home;
