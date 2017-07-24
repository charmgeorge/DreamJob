import React, { Component } from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {BrowserRouter as Redirect, Link } from 'react-router-dom';

const style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
};

const Footer = () =>  (
  <div style={style}>
    <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav bsStyle="pills" >
          <Navbar.Text>
            <Navbar.Link href='https://github.com/charmgeorge/DreamJob' target="_blank">Project GitHub Link</Navbar.Link>
          </Navbar.Text>
          <NavItem eventKey={2}><Link to='/about'>About the Team</Link></NavItem>
          <NavItem eventKey={3}><Link to='/project'>About the Project</Link></NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
);


export default Footer;
