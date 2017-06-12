import React, { Component } from 'react';
import {checkLoginRedir, createJob} from '../actions/actions';
import jobStore from '../stores/jobStore';
import {Form, FormGroup, Col, ControlLabel, FormControl, Checkbox, Button} from 'react-bootstrap';

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

componentWillMount(){
  jobStore.on('jobAdded', this.redirect.bind(this)) //NEED
  checkLoginRedir(this.props)
}

componentWillUpdate(){
  checkLoginRedir(this.props)
}

redirect(){
  this.props.history.push("/job_index")
}

handleChange(e){
  let target = e.target
  let job = this.state.job
  job[target.name] = target.value
  this.setState({
    job:job
  })
}

handleSubmit(e){
  e.preventDefault()
  createJob(this.state)
}

  render() {
    return (
      <div>
        <div>

          <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={4}>
                Email
              </Col>
              <Col sm={4}>
                <FormControl type="email" placeholder="Email" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={4}>
                Password
              </Col>
              <Col sm={4}>
                <FormControl type="password" placeholder="Password" />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={4} sm={4}>
                <Checkbox>Remember me</Checkbox>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={4} sm={4}>
                <Button type="submit">
                  Sign in
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>

  <div>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-6 col-xs-offset-3'>
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
    </div>
    );
  }
}

export default addJob;
