import React, { Component } from 'react';
import jobListing from '../components/jobListing'
import jobStore from '../stores/jobStore'


class jobIndex extends Component {
  constructor(props){
  super(props)
  this.state = {
    jobs: jobStore.getJobs()
    }
  }
  renderJobs(){
  let jobRender = []
  for(var i=0; i<this.state.jobs.length; i++){
    let jobId = "job-" + i
    jobRender.push(
      <jobListing key={jobId} job={this.state.jobs[i]}></jobListing>
    )
  }
  return jobRender
}

  render() {
    return (
      <div className="App">
        <h1>Current Dream Jobs</h1>
        <div className="job-list row">
            {this.renderJobs()}
          </div>
      </div>
    );
  }
}

export default jobIndex
