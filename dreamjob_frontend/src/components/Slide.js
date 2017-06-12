import React, { Component } from 'react';
import {Carousel} from 'react-bootstrap';

class Slide extends Component {
  render(){
    return(
      <Carousel>
        <Carousel.Item>
          <img className='pictures' alt="rock" src="https://s-media-cache-ak0.pinimg.com/736x/b0/9f/28/b09f2888813aec6ed5c01761186bdf1a.jpg"/>
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>If you smell what the Rock is cooking.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='pictures' alt="jt" src='http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/celebrities_with_adhd_slideshow/getty_rm_photo_of_justin_timberlake.jpg'/>
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Tennessee whiskey.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='pictures' alt="marilyn" src="http://cdn-img.instyle.com/sites/default/files/styles/684xflex/public/1440528488/082515-celeb-beauty-marks-lead.jpg?itok=duBtCgGx"/>
          <Carousel.Caption>
            <h3>Third slide labe</h3>
            <p>Marilyn.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default Slide
