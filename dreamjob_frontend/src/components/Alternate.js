import React, { Component } from 'react';
import Pop from './Pop';

class Alternate extends Component {
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
      <tr>
        <td className={this.updateClass()}></td>
        <td>{this.props.job.company}</td>
        <td>{this.props.job.jobTitle}</td>
        <td>{this.props.job.status}</td>
        <td><Pop history={this.props.history} job={this.props.job} /></td>
      </tr>
    )
  }
}

export default Alternate;
