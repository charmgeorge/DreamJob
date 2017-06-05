import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {getDetails} from '../actions'

class JobListing extends Component {

  handleClick(e){
    e.preventDefault();
    getDetails(this.props.job.id)
  }

  render(){
    return(
      // <div className="container">
        <div className="col-xs-3 jobs">
          <ul>
            <li>
              {this.props.job.company}
            </li>
            <li>
              {this.props.job.jobTitle}
            </li>
            <li>
              {this.props.job.status}
            </li>
            <li>
              <div>
                <button className='btn-primary' onClick={this.handleClick.bind(this)}>Job Details</button>
              </div>
              {/* {this.props.job.id} */}
            </li>
          </ul>
        </div>
      // </div>
    )
  }
}

export default JobListing;
