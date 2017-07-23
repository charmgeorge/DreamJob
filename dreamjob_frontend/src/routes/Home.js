import React, { Component } from 'react';
import {Grid, Row, Col, Clearfix, Jumbotron, Button} from 'react-bootstrap';
import Slide from '../components/Slide'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';


class Home extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>find your why.</h1>
          <p>A SIMPLE, EASY APP TO STREAMLINE THE JOB SEARCH </p>
          <Link to='/register'><Button bsStyle='primary' bsSize='large'>Register Now</Button></Link>
        <Link to='/user'><Button bsStyle='primary' bsSize='large'>to user cp</Button></Link>
        </Jumbotron>
        <br />
        <div className='container benefits'>
          <Row className="headFeature">
            <h2>WORK SMARTER ON YOUR JOB HUNT</h2>
            <br/>
          </Row>
        <hr className='hrstyle'/>
          <Row className="feature1">
            <Col md={6}>
              <h2>STAY ON TOP OF CURRENT APPLICATIONS</h2>
              <br/>
              <p>Dream Job's intuitive interface makes it easy to keep track of your top choices in the job market. Capitalize on every lead, and know when to follow up.</p>
            </Col>
            <Col md={6}>
              <img className='thumbs' alt='organized' src="https://jobs.theguardian.com/getasset/cba61212-8124-4dd9-8ffe-567177350cc3/" />
            </Col>
          </Row>
          <br />
          <Row className="feature2">
            <Col md={6}>
              <img className='thumbs' alt='save-time' src="https://makeitbetter.net/wp-content/uploads/2016/03/Organize-Your-Desk-and-Work-More-Efficiently.png" />
            </Col>
            <Col md={6}>
              <h2>COMPARE YOUR OFFERS</h2>
              <br />
              <p>Have access to insider reviews from current and former employees. You want to make sure that each company is the perfect fit for you! </p>
            </Col>
          </Row>
          <br />
          <Row className="feature1">
            <Col md={6}>
              <h2>LAND THAT DREAM JOB</h2>
              <br />
              <p>Say goodbye to missed opportunites. Say hello to your Dream Job </p>
            </Col>

            <Col md={6} >
              <img className='thumbs' alt='insider' src="https://talghin.sellfile.ir/prod-images/577168.jpg" />
              <br />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Home;
