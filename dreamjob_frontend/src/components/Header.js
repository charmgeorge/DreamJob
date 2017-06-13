import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavItem,} from 'react-bootstrap';

class Header extends Component {

  email(){
    if(this.props.user){
      return `Welcome, ${this.props.user.email}`
    }else{
      return (
        <div>
          <Link to="/login">Login</Link> |
          <Link to="/Register">Register</Link>
        </div>
      )
    }
  }

  logout(){
    if(this.props.user){
      return <a onClick={this.props.logout}>Logout</a>
    }else{
      return <Link to="/">Home</Link>
    }
  }

  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Dream Job</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1}><Link to='/add_job'>Add a Job</Link></NavItem>
              <NavItem eventKey={2}><Link to='/job_index'>Job Pipeline</Link></NavItem>
              <NavItem eventKey={3}><Link to='/job_research'>Job Research</Link></NavItem>
              <NavItem eventKey={4}><Link to='/compare'>Compare Companies</Link></NavItem>

            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1}>{this.email()}</NavItem>
              <NavItem eventKey={2} href="/login">{this.logout()}</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
