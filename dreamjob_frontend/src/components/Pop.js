import React, { Component } from 'react';
import {Button, Modal} from 'react-bootstrap';
import {getDetails, checkLoginRedir, deleteJob, updateJobDetails} from '../actions/actions'
import jobStore from '../stores/jobStore'

class Pop extends Component {
  constructor(props){
  super(props)
  this.state={
    showModal: false,
    job:jobStore.getDetails()
  }
  this.close = this.close.bind(this);
  this.open = this.open.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    getDetails(this.props.job.id)
    this.setState({
      showModal: true
    })
  }

  updateDetails(){
    this.setState({
      job:jobStore.getDetails()
    })
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
        <Button
          bsStyle="primary"
          bsSize="xsmall"
          onClick={this.open}
        >
          Quick View
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Job Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Any updates? Keep track here.</h4>
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
                  <label>Notes</label>
                  <br />
                  <textarea rows="4" cols="30" type='text' name='notes' placeholder='Notes' value={this.state.job.notes} onChange={this.handleChange.bind(this)} >
                  </textarea>
                  <br />
                </div>
                <br />
              </div>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <Button bsStyle='primary' type='submit'>Update Job</Button>
              <Button bsStyle='danger' onClick={this.handleDelete.bind(this)}>Delete</Button>
              <Button bsStyle='success' onClick={this.handleGlassdoor.bind(this)}>Glassdoor</Button>
              <Button onClick={this.close}>Close</Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Pop
