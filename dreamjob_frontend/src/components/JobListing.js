import React, { Component } from 'react';
import Pop from './Pop';

class JobListing extends Component {
  handleClick(e){
    let id = this.props.job.id
    e.preventDefault();
    this.props.history.push('/job_details/' + id)
  }

  updateClass(){
    var rightNow = new Date().getTime()
    var updatedAt = new Date(this.props.job.updatedAt);
    var result = rightNow-updatedAt
    var color
    if(result <= 30000){
      color = "GREEN glyphicon glyphicon-arrow-up pull-left"
    } else if(result <= 60000){
      color = "YELLOW glyphicon glyphicon-arrow-right pull-left"
    } else {
      color = "RED glyphicon glyphicon-arrow-down pull-left"
    }
    return color
  }

  render(){
    return(
      <div>
        <div className="container">
          <ul className="jobList">

            <li>
              <div className={this.updateClass()}>
              </div>
            </li>

            <li>{this.props.job.company}</li>
            <li>{this.props.job.jobTitle}</li>
            <li>{this.props.job.status}</li>

            <li>
              <div>
                <Pop history={this.props.history} job={this.props.job} />
              </div>
            </li>

          </ul>
        </div>
      </div>
    )
  }
}

export default JobListing;

// <button
//   className='btn-primary glyphicon glyphicon-edit'
//   onClick={this.handleClick.bind(this)}>
// </button>
