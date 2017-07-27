import React, { Component } from 'react';
import {Navbar, Nav, NavItem, Image} from 'react-bootstrap';
import {BrowserRouter as Redirect, Link } from 'react-router-dom';

const style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    // textAlign: "center",
    // padding: "1rem",
    position: "relative",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
};

const Footer = () =>  (
  <footer style={style}>
    <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav bsStyle="pills" >
          <Navbar.Text>
            <Navbar.Link href='https://github.com/charmgeorge/DreamJob' target="_blank"><Image src="GitHub-Mark-32px.png" /></Navbar.Link>
          </Navbar.Text>
          <NavItem eventKey={2}><Link to='/about'>About the Team</Link></NavItem>
          <NavItem eventKey={3}><Link to='/project'>About the Project</Link></NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </footer>
);


export default Footer;
