import React, { Component } from 'react';
import JobListing from '../components/JobListing'
import jobStore from '../stores/jobStore'
import {checkLoginRedir, updateJobs} from '../actions/actions'

class jobIndex extends Component {
  constructor(props){
  super(props)
  updateJobs()
  this.state = {
    jobs: jobStore.getJobs()
    }
  }

  componentWillMount(){
    jobStore.on('jobsLoaded',this.updateJobs.bind(this)) // NEED
    jobStore.on('jobDeleted',this.updateJobs.bind(this)) // NEED
    checkLoginRedir(this.props)
  }

  componentWillUnmount(){
    jobStore.removeListener('jobsLoaded',this.updateJobs.bind(this))
  }

  //after a job is added or the job's details are updated, refresh the state with all jobs
  updateJobs(){
    this.setState({
      jobs:jobStore.getJobs()
    })
  }

  //this uses JobListing helper component to generate list view of each job.
  renderJobs(){
    let jobRender = []
    for(var i=0; i<this.state.jobs.length; i++){
      let jobId = "job-" + i
      jobRender.push(
        <JobListing history={this.props.history} key={jobId} job={this.state.jobs[i]} />
      )
    }
    return jobRender
  }

  render() {
    return (
      <div className='container'>
        <div className="App">
          <h3>Current Dream Jobs</h3>
          <div className=" job-list row">
            {this.renderJobs()}
          </div>
        </div>
      </div>
    );
  }
}

export default jobIndex
