import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import {updateJobs, checkLoginRedir} from '../actions/actions';
import jobStore from '../stores/jobStore';
import Alternate from '../components/Alternate'

class alternateView extends Component {
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
      jobRender.push(
        <Alternate history={this.props.history} key={jobId} job={this.state.jobs[i]} />
      )
    }
    return jobRender
  }

  render() {
    return (
      <div className='container'>
          <h3>Current Dream Jobs</h3>
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th></th>
                  <th>Company</th>
                  <th>Job Title</th>
                  <th>Status</th>
                  <th>Job Details</th>
                </tr>
              </thead>
              <tbody>
            {this.renderJobs()}
              </tbody>
            </Table>
      </div>
    );
  }
}

export default alternateView
