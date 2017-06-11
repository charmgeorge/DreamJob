import React, { Component } from 'react';
import Slide from '../components/Slide';
import {Grid, Row, Col, Clearfix} from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>LIVE THE DREAM</h1>
        <h4>find your why</h4>
        <Slide />
        <br />

        <Grid>
            <Row className="show-grid">
              <Col sm={6} md={3}>
                <img className='thumbs' src="http://www.addspacetoyourlife.com/wp-content/uploads/2013/10/things-organized-neatly-clipboard.jpg" />
                <br />
                <h5>Stay Organized</h5>
              </Col>
              <Col sm={6} md={3}>
                <img className='thumbs' src="http://www.radius180.com/wp-content/uploads/2014/04/save-time-money.jpg" />
                <br />
                <h5>Save Time</h5>
              </Col>
              <Clearfix visibleSmBlock><code>&lt;{'Clearfix visibleSmBlock'} /&gt;</code></Clearfix>
              <Col sm={6} md={3}>
                <img className='thumbs' src="http://blog.ss8.com/wp-content/uploads/2015/06/insider_threat.jpg" />
                <br />
                <h5>Get an inside peak at the company</h5>
              </Col>
              <Col sm={6} md={3}>
                <img className='thumbs' src="https://thumbs.dreamstime.com/x/win-race-15103131.jpg" />
                <br />
                <h5>Get the job</h5>
              </Col>
            </Row>
          </Grid>
      </div>
    );
  }
}

export default Home;


// <div className='row'>
//   <div className='gridItem col-sm-6'>
//     <img className='thumbs' src="http://www.addspacetoyourlife.com/wp-content/uploads/2013/10/things-organized-neatly-clipboard.jpg" />
//     <br />
//     <h5>Stay Organized</h5>
//   </div>
//   <div className='gridItem col-sm-6'>
//     <img className='thumbs' src="http://www.radius180.com/wp-content/uploads/2014/04/save-time-money.jpg" />
//     <br />
//     <h5>Save Time</h5>
//   </div>
//   <div className='gridItem col-sm-6'>
//     <img className='thumbs' src="http://blog.ss8.com/wp-content/uploads/2015/06/insider_threat.jpg" />
//     <br />
//     <h5>Peak into the companies for which you're applying</h5>
//   </div>
//   <div className='gridItem col-sm-6'>
//     <img className='thumbs' src="https://thumbs.dreamstime.com/x/win-race-15103131.jpg" />
//     <br />
//     <h5>Get the job</h5>
//   </div>
//
// </div>
