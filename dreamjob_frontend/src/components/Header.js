import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
  login(){
    if(this.props.user){
      return(
        <div className="navi">
          <ul className='navList'>
            <li>
              {this.props.user.email}
            </li>
            <li>
              <a onClick={this.props.logout}>Logout</a> ||
            </li>
            <li>
              <Link to="/">Home</Link> ||
            </li>
            <li>
              <Link to="job_index">Your Jobs</Link>
            </li>
          </ul>
        </div>
      )
    } else {
      return(
        <div>
          <Link to="/login">Login</Link>
          <Link to="/">Home</Link>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <div className="pull-right">

          {this.login()}
        </div>
      </div>
    );
  }
}

export default Header;
