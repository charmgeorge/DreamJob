import React, { Component } from 'react';
import {checkLoginRedir, updateJobDetails, deleteJob, getDetails, updateJobs} from '../actions/actions'
import jobStore from '../stores/jobStore'
import {Link} from 'react-router-dom'

//jobDetails must persist, so we call ACTION in constructor
class jobDetails extends Component {
  constructor(props){
    super(props)
    getDetails(this.props.match.params.id)
    this.state={
      job: jobStore.getDetails(),
      error: ""
    }
  }

  updateDetails(){
    this.setState({
      job:jobStore.getDetails()
    })
  }

  redirect(){
    this.props.history.push('/job_index');
  }

  componentWillMount(){
    jobStore.on('jobDetails', this.updateDetails.bind(this)) // NEED
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
              <div className="pull-left">
                <Link to="/job_index"><button onClick={this.redirect.bind(this)} className='btn-primary glyphicon glyphicon-list'>Index</button></Link>
              </div>
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

export default jobDetails;
