import React, { Component } from 'react';
import {getDetails} from '../actions/actions'

class JobListing extends Component {

  handleClick(e){
    e.preventDefault();
    getDetails(this.props.job.id)
  }

  updateClass(){
    var rightNow = new Date().getTime()
    var updatedAt = new Date(this.props.job.updatedAt);
    var result = rightNow-updatedAt
    var color

    if(result <= 30000){
      color = "col-xs-3 GREEN"
    }
    else if(result <= 60000){
      color = "col-xs-3 YELLOW"
    }
    else {
      color = "col-xs-3 RED"
    }
    return color
  }

  render(){
    return(
      // <div className="container">
        <div className={this.updateClass()} >
          <ul>
            {/* <li>
              {this.props.job.id}
            </li>
            <li>
              {this.props.job.updatedAt}
            </li> */}
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
                <button className='btn-primary glyphicon glyphicon-edit' onClick={this.handleClick.bind(this)}></button>
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
