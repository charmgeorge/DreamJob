import React, { Component } from 'react';
import JobListing from '../components/jobListing'
import jobStore from '../stores/jobStore'
import {Link} from 'react-router-dom'
import {checkLoginRedir} from '../actions/actions'

class jobIndex extends Component {
  constructor(props){
  super(props)
  this.state = {
    jobs: jobStore.getJobs()
    }
  }


  updateJobs(){
    this.setState({
      jobs:jobStore.getJobs()
    })
  }

  redirect(){
    console.log(this.state.jobs);
    // let id = this.state.job.id
    // debugger
    // this.props.history.push('/job_details')
    this.props.history.push('/job_details/' )
  }

  componentWillMount(){
    jobStore.on('jobAdded',this.updateJobs.bind(this))
    jobStore.on('jobsLoaded',this.updateJobs.bind(this))
    // jobStore.on('jobDetails', this.redirect.bind(this))
    jobStore.on('jobDetailsUpdated', this.updateJobs.bind(this))
    checkLoginRedir(this.props)
  }

  componentWillUnmount(){
    jobStore.removeListener('jobAdded',this.updateJobs.bind(this))
    jobStore.removeListener('jobsLoaded',this.updateJobs.bind(this))
    // jobStore.removeListener('jobDetails', this.redirect.bind(this))
    jobStore.removeListener('jobDetailsUpdated', this.updateJobs.bind(this))
  }

  componentWillUpdate(){
    jobStore.on('jobAdded',this.updateJobs.bind(this))
    jobStore.on('jobsLoaded',this.updateJobs.bind(this))
    jobStore.on('jobDetails', this.redirect.bind(this))
    jobStore.on('jobDetailsUpdated', this.updateJobs.bind(this))
    checkLoginRedir(this.props)
  }

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
          <div className="pull-left">
            <Link to="/add_job"><button className='btn-primary'>Add Job</button></Link>
          </div>
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
