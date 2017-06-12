import React, { Component } from 'react';
import JobListing from '../components/JobListing'
import JobListing2 from '../components/JobListing2'
import jobStore from '../stores/jobStore'
import {checkLoginRedir, updateJobs} from '../actions/actions'
import {Link} from 'react-router-dom'

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

  updateJobs(){
    this.setState({
      jobs:jobStore.getJobs()
    })
  }

  renderJobs(){
    let jobRender = []
    for(var i=0; i<this.state.jobs.length; i++){
      let jobId = "job-" + i
      if(i % 2 !== 0){
        jobRender.push(
          <JobListing history={this.props.history} key={jobId} job={this.state.jobs[i]} />
        )
      }else{
        jobRender.push(
          <JobListing2 history={this.props.history} key={jobId} job={this.state.jobs[i]} />
        )
      }
    }
    return jobRender
  }

  render() {
    return (
      <div className='container'>
        <div className='pull-left'><Link to="/job_index_alternate">Alternate Job Pipeline View</Link></div>
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
