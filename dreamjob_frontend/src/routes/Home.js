import React, { Component } from 'react';
import {BrowserRouter as Link} from 'react-router-dom';


class Home extends Component {

  // <h2>where the dream jobs go.... to become yours</h2>
  // <Link to="/register"><button className='btn-primary'>Register</button></Link>

  render() {
    return (
      <div>
        <h1>LIVE THE DREAM</h1>
        <h4>find your why</h4>
        {/* <Link to='/job_index'> brady </Link>             */}
        {/* <Link to="/register">Home</Link> */}
      </div>
    );
  }
}

export default Home;
