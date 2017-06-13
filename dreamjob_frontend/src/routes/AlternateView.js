import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import {updateJobs, checkLoginRedir, sort, userLogout} from '../actions/actions';
import jobStore from '../stores/JobStore';
import Alternate from '../components/Alternate';
import {Button} from 'react-bootstrap';
import userStore from '../stores/UserStore';
import Header from '../components/Header';

class AlternateView extends Component {
  constructor(props){
  super(props)
  updateJobs()
  this.state = {
    jobs: jobStore.getJobs(),
    currentUser: userStore.getUser()
    }
  }

  componentWillMount(){
    jobStore.on('jobsLoaded',this.updateJobs.bind(this)) //need to listen to this emission
    jobStore.on('jobDeleted',this.updateJobs.bind(this)) //need to listen to this emission
    jobStore.on('sorted',this.updateJobs.bind(this)) //need to listen to this emission
    checkLoginRedir(this.props)
  }

  componentWillUpdate(){
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

  handleClick(e){
    let column = e.target.name
    sort(column)
  }


  render() {
    return (
      <div className='container'>
        <h3 className='centerTitle'>Current Dream Jobs</h3>

          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th><Button block bsStyle='danger' name='updatedAt' onClick={this.handleClick.bind(this)}>Heat Map</Button></th>
                <th><Button block name='company' onClick={this.handleClick.bind(this)}>Company</Button></th>
                <th><Button block name='jobTitle' onClick={this.handleClick.bind(this)}>Job Title</Button></th>
                <th><Button block name='status' onClick={this.handleClick.bind(this)}>Status</Button></th>
                <th><Button block className="clear">Job Details</Button></th>
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

export default AlternateView
