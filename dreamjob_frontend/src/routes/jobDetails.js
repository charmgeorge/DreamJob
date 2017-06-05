import React, { Component } from 'react';
// import logo from '../logo.svg';
import '../App.css';
import {createJob, getDetails, updateJobDetails} from '../actions'
import jobStore from '../stores/jobStore'
import {Link} from 'react-router-dom'

class jobDetails extends Component {
  constructor(props){
  super(props)
  // getDetails()
  this.state={
    job: jobStore.getDetails()
//     message:"",
//     status:"",
//     error:""
  }
  }
//
  updateDetails(){
    this.setState({
      job:jobStore.getDetails()
    })
  }

  componentWillMount(){
    jobStore.on('jobDetails', this.updateDetails.bind(this))
    jobStore.on('jobDetailsUpdated', this.updateDetails.bind(this))
  }
//
// // componentWillUpdate(){
// //   jobStore.on('jobAdded', this.redirect.bind(this))
// // }
//
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

  render() {
    return (
      <div className="App">
        <div className="pull-left">
          <Link to="/jobIndex"><button className='btn-primary'>Back to Job Index</button></Link>
        </div>
        <h3>Job Details</h3>
        <form className="form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group inline">
            <label className='control-label'>Company</label>
            <input type='text' name='company' value={this.state.job.company} onChange={this.handleChange.bind(this)}/>
              <input type='text' name='url' placeholder="URL" value={this.state.job.url} onChange={this.handleChange.bind(this)}/>
              <br />
          </div>
          <div className="form-group">
            <label>Job Title</label>
            <input type='text' name='jobTitle' value={this.state.job.jobTitle} onChange={this.handleChange.bind(this)} />
            <br />
          </div>
          <div className="form-group">
            <label>City</label>
            <input type='text' name='city' value={this.state.job.city} onChange={this.handleChange.bind(this)} />
            <br />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name='status' value={this.state.job.status} onChange={this.handleChange.bind(this)}>
              <option></option>
              <option>Interested</option>
              <option>Applied</option>
              <option>Interviewed</option>
              <option>Offered</option>
            </select>
            <br />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type='date' name='date' value={this.state.job.date} onChange={this.handleChange.bind(this)} />
            <br />
          </div>
          {/* <div className="form-group">
            <label>Job Posting URL</label>
            <input type='text' name='url' value={this.state.job.url} onChange={this.handleChange.bind(this)}/>
            <br />
          </div> */}
          <div className="form-group">
            <textarea rows="4" cols="30" type='text' name='notes' placeholder='Notes' value={this.state.job.notes} onChange={this.handleChange.bind(this)} >
            </textarea>
            <br />
          </div>
          <div className="form-group">
            <input type='submit' value='Update Job' className="btn btn-primary" />
            {/* <input value="Delete" className="btn btn-danger" /> */}
            <br />
          </div>
        </form>
      </div>
    );
  }
}

export default jobDetails;
