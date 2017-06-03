import React, { Component } from 'react';

class JobListing extends Component {
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
          </ul>
        </div>
      // </div>
    )
  }
}

export default JobListing;
