import React, { Component } from 'react';
import {BrowserRouter as Link} from 'react-router-dom';


class Home extends Component {

  // <h2>where the dream jobs go.... to become yours</h2>

  render() {
    return (
      <div>
        <h1>Live The Dream</h1>
        <h3>find your why</h3>
        {/* <Link to='/job_index'> brady </Link>             */}
        <Link to="/register"><button className='btn-primary'>Register</button></Link>
        {/* <Link to="/register">Home</Link> */}
      </div>
    );
  }
}

export default Home;
