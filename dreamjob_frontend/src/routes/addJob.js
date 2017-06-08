import React, { Component } from 'react';
import {checkLoginRedir, createJob} from '../actions/actions';
import jobStore from '../stores/jobStore';
import {Link} from 'react-router-dom';

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
    },
    message:"",
    status:"",
    error:""
  }
}

redirect(){
  this.props.history.push("/job_index")
}

componentWillMount(){
  jobStore.on('jobAdded', this.redirect.bind(this))
  checkLoginRedir(this.props)
}

componentWillUpdate(){
  checkLoginRedir(this.props)
}

handleSubmit(e){
  e.preventDefault()
  createJob(this.state)
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
      <div>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-6 col-xs-offset-3'>
              <div className="pull-left">
                <Link to="/job_index"><button className='btn-primary glyphicon glyphicon-list'>Index</button></Link>
              </div>
              <div className='panel panel-default'>
                <div className='panel-body'>
                  <h3>Add A Job</h3>
                  <form className="form" onSubmit={this.handleSubmit.bind(this)}>
                    <div className='row'>
                      <div className='col-xs-12'>
                        <div>
                          <label>Company</label>
                          <br />
                          <input type='text' name='company' value={this.state.job.company} onChange={this.handleChange.bind(this)} />
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
                          <input type='text' name='jobTitle' value={this.state.job.jobTitle} onChange={this.handleChange.bind(this)}/>
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
                          <input type='date' name='date' value={this.state.job.date} onChange={this.handleChange.bind(this)}/>
                          <br />
                        </div>
                        <div>
                          <br />
                          <textarea rows="4" cols="30" type='text' name='notes' placeholder='Notes' value={this.state.job.notes} onChange={this.handleChange.bind(this)}>
                          </textarea>
                          <br />
                        </div>
                        <div>
                          <input type='submit' value='Submit' className="btn btn-primary" />
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

export default addJob;
