import React, { Component } from 'react';
import JobListing from '../components/jobListing'
import jobStore from '../stores/jobStore'
import {Link} from 'react-router-dom'
import {checkLoginRedir} from '../actions/actions'

class jobIndex extends Component {
  constructor(props){
  super(props)
  this.state = {
    jobs: jobStore.getJobs(),
    // status:""
    }
  }

  updateJobs(){
    this.setState({
      jobs:jobStore.getJobs()
    })
  }

  redirect(){
    this.props.history.push('/job_details')
  }

  componentWillMount(){
    jobStore.on('jobAdded',this.updateJobs.bind(this))
    jobStore.on('jobsLoaded',this.updateJobs.bind(this))
    jobStore.on('jobDetails', this.redirect.bind(this))
    checkLoginRedir(this.props)
  }

  componentWillUpdate(){
    checkLoginRedir(this.props)
  }

  renderJobs(){
    let jobRender = []
    for(var i=0; i<this.state.jobs.length; i++){
      let jobId = "job-" + i
      jobRender.push(
        <JobListing key={jobId} job={this.state.jobs[i]}/>
      )
    }
    return jobRender
  }

  render() {
    return (
      <div className="App">
        <div className="pull-left">
          <Link to="/add_job"><button className='btn-primary'>Add Job</button></Link>
        </div>
        <h3>Current Dream Jobs</h3>
        <div className="job-list row">
          {this.renderJobs()}
        </div>
      </div>
    );
  }
}

export default jobIndex
