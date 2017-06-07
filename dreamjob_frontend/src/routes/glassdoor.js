import React, { Component } from 'react';
import jobStore from '../stores/jobStore'

class glassdoor extends Component {
  constructor(props){
    super(props)
    this.state={
      overallRating: jobStore.getDetails()
        // name:"",
        // overallRating:"",
        // recommendToFriendRating:""
    }
  }

  updateDetails(){
    this.setState({
      overallRating:jobStore.getDetails()
    })
  }

  componentWillMount(){
    jobStore.on('glassdoor', this.updateDetails.bind(this))
  }

  render() {
    return (
      <div>
        <ul>

          <li>OverallRating: {this.state.overallRating}</li>
        </ul>
      </div>
    );
  }
}

export default glassdoor;
