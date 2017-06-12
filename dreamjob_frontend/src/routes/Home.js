import React, { Component } from 'react';
import {Grid, Row, Col, Clearfix, Jumbotron, Button} from 'react-bootstrap';
import Slide from '../components/Slide'

class Home extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>find your why.</h1>
          <p>A SIMPLE, EASY APP TO STREAMLINE THE JOB SEARCH </p>
          <p className='homeButton'><Button bsStyle='primary' bsSize='large'>Register Now »</Button></p>
        </Jumbotron>
        <br />
        <div className='container benefits'>
          <Row className="headFeature">

              <h2>stay orginized during your job search</h2>
              <p>Dream Job's intuitive interface makes it easy to keep track of your top choices in the job market</p>

          </Row>
        <hr className='hrstyle'/>
          <Row className="feature1">
            <Col md={6}>
              <h2>stay orginized during your job search</h2>
              <p>Dream Job's intuitive interface makes it easy to keep track of your top choices in the job market</p>
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
              <h2>stay orginized during your job search</h2>
              <p>Kombucha authentic fixie ugh iceland. Lumbersexual ugh flannel williamsburg, meggings biodiesel asymmetrical chicharrones paleo copper mug. Pork belly tousled small batch, irony sriracha gochujang yr deep v umami fam letterpress poke jianbing synth. Direct trade cloud bread copper mug, vaporware next level thundercats palo santo intelligentsia etsy put a bird on it heirloom kale chips enamel pin. Jean shor</p>
            </Col>
          </Row>
          <br />
          <Row className="feature1">
            <Col md={6}>
              <h2>stay orginized during your job search</h2>
              <p>Enamel pin tote bag biodiesel cronut beard VHS letterpress. Kogi organic retro skateboard godard readymade. Pug sustainable tofu flexitarian, letterpress marfa humblebrag. Four dollar toast readymade offal blue bottle plaid, asymmetrical food truck shaman vegan brooklyn twee biodiesel occupy normcore.</p>
            </Col>

            <Col md={6} >
              <img className='thumbs' alt='insider' src="http://talghin.sellfile.ir/prod-images/577168.jpg" />
              <br />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Home;
