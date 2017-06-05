import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {getDetails} from '../actions'

class JobListing extends Component {

  //HOW DO WE SEND THE ID WITH THE HANDLECLICK!

  handleClick(){
    getDetails()
  }

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
                <Link to="/jobDetails"><button onClick={this.handleClick.bind(this)} className='btn-primary'>Job Details</button></Link>
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
