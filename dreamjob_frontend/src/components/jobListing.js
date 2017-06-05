import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class JobListing extends Component {
  render(){
    return(
      // <div className="container">
        <div className="col-xs-3 jobs">
          <ul>
            <li>
              {this.props.job.id}
            </li>
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
              <div className="pull-left">
                <Link to="/jobDetails"><button className='btn-primary'>Job Details</button></Link>
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
