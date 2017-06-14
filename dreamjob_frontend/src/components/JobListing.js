import React, { Component } from 'react';
import Pop from './Pop';
import {Col} from 'react-bootstrap'

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
      color = "GREEN glyphicon glyphicon-arrow-up pull-left "
    } else if(result <= 60000){
      color = "YELLOW glyphicon glyphicon-arrow-right pull-left"
    } else {
      color = "RED glyphicon glyphicon-arrow-down pull-left"
    }
    return color
  }

  render(){
    let location
    if(this.props.location === "pull"){
      location = {md: 6, mdPull: 6}
    } else {
      location = {md: 6, mdPush: 6}
    }
    return(
      <div>
        <Col {...location}>
          <ul className ='jobList'>
            <li>
              <br />
              <div className={this.updateClass()}>
              </div>
            </li>
            <br/>
            <li>{this.props.job.company}</li>
            <li>{this.props.job.jobTitle}</li>
            <li>{this.props.job.status}</li>
            <li>
              <div>
                <Pop history={this.props.history} job={this.props.job} />
                <br />
              </div>
            </li>
          </ul>
        </Col>
      </div>
    )
  }
}

export default JobListing;
