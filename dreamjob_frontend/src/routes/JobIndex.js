import React, { Component } from 'react';
import JobListing from '../components/JobListing'
import jobStore from '../stores/JobStore'
import {checkLoginRedir, updateJobs, sort} from '../actions/actions'
import {Grid, Row, Button} from 'react-bootstrap'


class JobIndex extends Component {
  constructor(props){
  super(props)
  if(checkLoginRedir(this.props)){
    updateJobs()
  }
  this.state = {
    jobs: jobStore.getJobs()
    }
  }

  componentWillMount(){
    checkLoginRedir(this.props)
    jobStore.on('jobsLoaded',this.updateJobs.bind(this)) //need to listen to this emission
    jobStore.on('jobDeleted',this.updateJobs.bind(this)) //need to listen to this emission
    jobStore.on('sorted',this.updateJobs.bind(this)) //need to listen to this emission
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
          <JobListing location="pull" history={this.props.history} key={jobId} job={this.state.jobs[i]} />
        )
      }else{
        jobRender.push(
          <JobListing location="push" history={this.props.history} key={jobId} job={this.state.jobs[i]} />
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
  jobRedirect(){
    this.props.history.push('add_job')
  }

  render() {
    return (
      <div className='listContainer'>
      <div  className='container'>
        <Row>
          <div className='pull-left'>
            <Button bsStyle='primary' onClick={this.jobRedirect.bind(this)}>Add a Job</Button>
          </div>
          <div className='pull-right'>
            <Button bsStyle='primary' onClick={this.redirect.bind(this)}>Alternate Job Pipeline View</Button>
          </div>

        </Row>
        <div>
          <h3>Current Dream Jobs</h3>
          <div className=" job-list row">
            <Grid>
              <Row className="show-grid">
                {this.renderJobs()}
              </Row>
            </Grid>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default JobIndex


// <div className='pull-right'>
//   <Button bsStyle='danger' name='updatedAt' onClick={this.handleClick.bind(this)}>Heat Map</Button>
// </div>
