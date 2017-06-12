import React, { Component } from 'react';
import JobListing from '../components/JobListing'
import JobListing2 from '../components/JobListing2'
import jobStore from '../stores/jobStore'
import {checkLoginRedir, updateJobs, sort} from '../actions/actions'
import {Button} from 'react-bootstrap'

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
    jobStore.on('sorted',this.updateJobs.bind(this)) // NEED
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
      if((i % 2) !== 0){
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

  handleClick(e){
    let column = e.target.name
    sort(column)
  }

  redirect(){
    this.props.history.push('job_index_alternate')
  }

  render() {
    return (
      <div className='container'>
        <div className='pull-left'>
          <Button onClick={this.redirect.bind(this)}>Alternate Job Pipeline View</Button>
        </div>
        <div className='pull-right'>
          <Button bsStyle='danger' name='updatedAt' onClick={this.handleClick.bind(this)}>Heat Map</Button>
        </div>
        <div>
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
