import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

class addJob extends Component {
  constructor(props){
  super(props)
  this.state={
    job: {
      company:"",
      jobTitle:"",
      city:"",
      status:"",
      date:"",
      url:"",
      notes:""
    }
  }
}

handleChange(e){
  let target = e.target
  let job = this.state.job
  job[target.name] = target.value
  this.setState({
    job:job
  })
  console.log(this.state.job)
}

  render() {
    return (
      <div className="App">
        <h3>Add A Job</h3>
        <form className="form">
          <div className="form-group">
            <label>Company</label>
            <input type='text' name='company' value={this.state.job.company} onChange={this.handleChange.bind(this)} />
            <br />
          </div>
          <div className="form-group">
            <label>Job Title</label>
            <input type='text' name='jobTitle' value={this.state.job.jobTitle} onChange={this.handleChange.bind(this)}/>
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
            <input type='text' name='date' value={this.state.job.date} onChange={this.handleChange.bind(this)}/>
            <br />
          </div>
          <div className="form-group">
            <label>Job Posting URL</label>
            <input type='text' name='url' value={this.state.job.url} onChange={this.handleChange.bind(this)}/>
            <br />
          </div>
          <div className="form-group">
            <label>Notes</label>
            <input type='textarea' name='notes' value={this.state.job.notes} onChange={this.handleChange.bind(this)}/>
            <br />
          </div>
          <div className="form-group">
            <input type='submit' value='Submit' />
            <br />
          </div>
        </form>
      </div>
    );
  }
}

export default addJob;
