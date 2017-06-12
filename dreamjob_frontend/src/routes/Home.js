import React, { Component } from 'react';
import {Grid, Row, Col, Clearfix, Jumbotron} from 'react-bootstrap';
import Slide from '../components/Slide'

class Home extends Component {
  render() {
    return (
      <div>

        <Jumbotron>
          <h1>find your why.</h1>
          <p>A SIMPLE, EASY APP TO STREAMLINE THE JOB SEARCH </p>
        </Jumbotron>
        <br />
        <div className='container benefits'>
          <Grid>
              <Row className="show-grid">
                <Col sm={6} md={3}>
                  <img className='thumbs' alt='organized' src="http://www.addspacetoyourlife.com/wp-content/uploads/2013/10/things-organized-neatly-clipboard.jpg" />
                  <br />
                  <h5>Stay Organized</h5>
                </Col>
                <Col sm={6} md={3}>
                  <img className='thumbs' alt='save-time' src="http://www.radius180.com/wp-content/uploads/2014/04/save-time-money.jpg" />
                  <br />
                  <h5>Save Time</h5>
                </Col>
                <Clearfix visibleSmBlock><code>&lt;{'Clearfix visibleSmBlock'} /&gt;</code></Clearfix>
                <Col sm={6} md={3}>
                  <img className='thumbs' alt='insider' src="http://blog.ss8.com/wp-content/uploads/2015/06/insider_threat.jpg" />
                  <br />
                  <h5>Get an inside peak at the company</h5>
                </Col>
                <Col sm={6} md={3}>
                  <img className='thumbs' alt='get-hired' src="https://thumbs.dreamstime.com/x/win-race-15103131.jpg" />
                  <br />
                  <h5>Get the job</h5>
                </Col>
              </Row>
            </Grid>
          </div>
      </div>
    );
  }
}

export default Home;
