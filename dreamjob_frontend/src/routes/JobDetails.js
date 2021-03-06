import React, { Component } from 'react';
import {checkLoginRedir, updateJobDetails, deleteJob, getDetails} from '../actions/actions'
import jobStore from '../stores/JobStore'
import {Link} from 'react-router-dom'
import {updateJobs} from '../actions/actions'

class JobDetails extends Component {
  constructor(props){
    super(props)
    getDetails(this.props.match.params.id)
    this.state={
      job: jobStore.getDetails(),
      error: ""
    }
  }

  componentWillMount(){
    // jobStore.on('jobDetailsUpdated', this.updateDetails.bind(this)) //do we need this?
    jobStore.on('jobDeleted', this.redirect.bind(this))
    jobStore.on('jobDetails', this.updateDetails.bind(this))
    checkLoginRedir(this.props)
  }

  updateDetails(){
    this.setState({
      job:jobStore.getDetails()
    })
  }

  redirect(){
    this.props.history.push('/job_index');
  }

  renewJobs(){
    updateJobs()
  }

  componentWillMount(){
    jobStore.on('jobDetails', this.updateDetails.bind(this)) //need to listen to this emission
    jobStore.on('jobDeleted', this.redirect.bind(this)) //need to listen to this emission
    checkLoginRedir(this.props)
  }

  handleDelete(e){
    e.preventDefault();
    deleteJob(this.state.job.id)
  }

  handleSubmit(e){
    e.preventDefault()
    updateJobDetails(this.state)
  }

  handleChange(e){
    let target = e.target
    let job = this.state.job
    job[target.name] = target.value
    this.setState({
      job:job
    })
  }

  handleGlassdoor(e){
    let company = this.state.job.company
    e.preventDefault()
    this.props.history.push('/glassdoor/' + company)
  }

  render() {
    return (
      <div>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-6 col-xs-offset-3'>
                <div className='panel panel-default'>
                  <div className='panel-body'>
                    <h3>Job Details</h3>
                    <form className="form" onSubmit={this.handleSubmit.bind(this)}>
                      <div className='row'>
                        <div className='col-xs-12'>
                          <div>
                            <label>Company</label>
                            <br />
                            <input type='text' name='company' value={this.state.job.company} onChange={this.handleChange.bind(this)}/>
                              <br />
                          </div>
                          <div>
                            <label>URL to Job Posting</label>
                            <br />
                            <input type='text' name='url' value={this.state.job.url} onChange={this.handleChange.bind(this)}/>
                            <br />
                          </div>
                          <div>
                            <label>Job Title</label>
                            <br />
                            <input type='text' name='jobTitle' value={this.state.job.jobTitle} onChange={this.handleChange.bind(this)} />
                            <br />
                          </div>
                          <div>
                            <label>City</label>
                            <br />
                            <input type='text' name='city' value={this.state.job.city} onChange={this.handleChange.bind(this)} />
                            <br />
                          </div>
                          <div>
                            <label>Status</label>
                            <br />
                            <select name='status' value={this.state.job.status} onChange={this.handleChange.bind(this)}>
                              <option></option>
                              <option>Interested</option>
                              <option>Applied</option>
                              <option>Interviewed</option>
                              <option>Offered</option>
                            </select>
                            <br />
                          </div>
                          <div>
                            <label>Date</label>
                            <br />
                            <input type='date' name='date' value={this.state.job.date} onChange={this.handleChange.bind(this)} />
                            <br />
                          </div>
                          <div>
                            <br />
                            <textarea rows="4" cols="30" type='text' name='notes' placeholder='Notes' value={this.state.job.notes} onChange={this.handleChange.bind(this)} >
                            </textarea>
                            <br />
                          </div>
                          <div>
                            <input type='submit' value='Update Job' className="btn-primary" />
                            <button className="btn-danger glyphicon glyphicon-trash" onClick={this.handleDelete.bind(this)}></button>
                            <button className="btn-success" onClick={this.handleGlassdoor.bind(this)}>Glassdoor</button>
                            <br />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default JobDetails;
