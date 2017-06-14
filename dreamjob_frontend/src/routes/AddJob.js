import React, { Component } from 'react';
import {checkLoginRedir, createJob} from '../actions/actions';
import jobStore from '../stores/JobStore';
import {Form, Panel, FormGroup, Col, ControlLabel, FormControl, Checkbox, Button} from 'react-bootstrap';

class AddJob extends Component {
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
  jobStore.on('jobAdded', this.redirect.bind(this)) //need to listen to this emission
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
  console.log(this.state.job)
}

handleSubmit(e){
  e.preventDefault()
  createJob(this.state)
}

  render() {
    var divStyle = {
      paddingTop: 25,
    };
    return (
      <div className ="formContainer">
        <Panel className='formSize' header="Add a Job" bsStyle="primary">
          <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup controlId="formHorizontalEmail">
              <Col style={divStyle} componentClass={ControlLabel} sm={4}>
                Company
              </Col>
              <br />
              <Col sm={4}>
                <FormControl type='text' name='company' value={this.state.job.company} onChange={this.handleChange.bind(this)} placeholder="Company" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={4}>
                URL to Job Posting
              </Col>
              <Col sm={4}>
                <FormControl type='text' name='url' value={this.state.job.url} onChange={this.handleChange.bind(this)} placeholder="url" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={4}>
                Job Title
              </Col>
              <Col sm={4}>
                <FormControl type='text' name='jobTitle' value={this.state.job.jobTitle} onChange={this.handleChange.bind(this)} placeholder="Job Title" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={4}>
                City
              </Col>
              <Col sm={4}>
                <FormControl type='text' name='city' value={this.state.job.city} onChange={this.handleChange.bind(this)} placeholder="City" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formControlsSelect">
              <Col componentClass={ControlLabel} sm={4}>
                Status
              </Col>
              <Col sm={4}>
                <FormControl componentClass="select" name='status' value={this.state.job.status} onChange={this.handleChange.bind(this)} placeholder="Status">
                  <option></option>
                  <option>Interested</option>
                  <option>Applied</option>
                  <option>Interviewed</option>
                  <option>Offered</option>
                </FormControl>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={4}>
                Date
              </Col>
              <Col sm={4}>
                <FormControl type='date' name='date' value={this.state.job.date} onChange={this.handleChange.bind(this)} placeholder="Date" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formControlsTextarea">
              <Col componentClass={ControlLabel} sm={3}>
                Notes
              </Col>
              <Col sm={6}>
                <FormControl componentClass="textarea" name='notes' placeholder="Notes" value={this.state.job.notes} onChange={this.handleChange.bind(this)} />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={5} sm={4}>
                <Button type="submit">
                  Submit
                </Button>
              </Col>
            </FormGroup>

          </Form>
        </Panel>
    </div>
    );
  }
}

export default AddJob;

  // <div>
  //     <div className='container'>
  //       <div className='row'>
  //         <div className='col-xs-6 col-xs-offset-3'>
  //           <div className='panel panel-default'>
  //             <div className='panel-body'>
  //               <h3>Add A Job</h3>
  //               <form className="form" onSubmit={this.handleSubmit.bind(this)}>
  //                 <div className='row'>
  //                   <div className='col-xs-12'>
  //                     <div>
  //                       <label>Company</label>
  //                       <br />
  //                       <input type='text' name='company' value={this.state.job.company} onChange={this.handleChange.bind(this)} />
  //                         <br />
  //                     </div>
  //
  //                     <div>
  //                       <label>URL to Job Posting</label>
  //                       <br />
  //                       <input type='text' name='url' value={this.state.job.url} onChange={this.handleChange.bind(this)}/>
  //                       <br />
  //                     </div>
  //
  //                     <div>
  //                       <label>Job Title</label>
  //                       <br />
  //                       <input type='text' name='jobTitle' value={this.state.job.jobTitle} onChange={this.handleChange.bind(this)}/>
  //                       <br />
  //                     </div>
  //
  //                     <div>
  //                       <label>City</label>
  //                       <br />
  //                       <input type='text' name='city' value={this.state.job.city} onChange={this.handleChange.bind(this)} />
  //                       <br />
  //                     </div>
  //
  //                     <div>
  //                       <label>Status</label>
  //                       <br />
  //                       <select name='status' value={this.state.job.status} onChange={this.handleChange.bind(this)}>
  //                         <option></option>
  //                         <option>Interested</option>
  //                         <option>Applied</option>
  //                         <option>Interviewed</option>
  //                         <option>Offered</option>
  //                       </select>
  //                       <br />
  //                     </div>
  //
  //                     <div>
  //                       <label>Date</label>
  //                       <br />
  //                       <input type='date' name='date' value={this.state.job.date} onChange={this.handleChange.bind(this)}/>
  //                       <br />
  //                     </div>
  //
  //                     <div>
  //                       <br />
  //                       <textarea rows="4" cols="30" type='text' name='notes' placeholder='Notes' value={this.state.job.notes} onChange={this.handleChange.bind(this)}>
  //                       </textarea>
  //                       <br />
  //                     </div>
  //
  //                     <div>
  //                       <input type='submit' value='Submit' className="btn btn-primary" />
  //                       <br />
  //                     </div>
  //
  //                   </div>
  //                 </div>
  //               </form>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
