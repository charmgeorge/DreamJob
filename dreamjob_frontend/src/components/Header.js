import React, { Component } from 'react';
// import {Link, NavLink} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import Home from '../routes/Home';
import userStore from '../stores/UserStore';
import {
  BrowserRouter as Redirect, Link, Router, Route, NavLink, withRouter } from 'react-router-dom';

class Header extends Component {
  // constructor(props){
  //   super(props)
  // }

  componentWillUpdate(){
    userStore.on('logout', this.handleLogout.bind(this))
  }

  handleLogout(){
    this.props.history.push("/")
  }

  email(){
    if(this.props.user){
      return `Welcome, ${this.props.user.email}`
    }else{
      return (
        <div>
          <Link to="/login">Login</Link> |
          <Link to="/register">Register</Link>
        </div>
      )
    }
  }

  logout(){
    if(this.props.user){
      return <a onClick={this.props.logout}>Logout</a>
    } else{
      // what to do here???
      return <Redirect to="/" />
    }
  }

  render() {
    return (
      <div>
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a  href="/">Dream Job</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav bsStyle="pills" >
              <NavItem eventKey={1}><Link to='/add_job'>Add a Job</Link></NavItem>
              <NavItem eventKey={2}><Link to='/job_index'>Job Pipeline</Link></NavItem>
              <NavItem eventKey={3}><Link to='/job_research'>Job Research</Link></NavItem>
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
