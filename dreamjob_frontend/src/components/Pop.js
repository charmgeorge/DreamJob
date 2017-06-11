import React, { Component } from 'react';
import {Popover,Tooltip, Button, Modal, OverlayTrigger} from 'react-bootstrap';
import {getDetails, checkLoginRedir, deleteJob, updateJobDetails} from '../actions/actions'
import jobStore from '../stores/jobStore'

class Pop extends Component {
  constructor(props){
  super(props)
  getDetails(this.props.job.id)
  this.state={
    showModal: false,
    job: jobStore.getDetails(),
    error: ""
  }
  this.close = this.close.bind(this);
  this.open = this.open.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true })
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
    jobStore.on('jobDeleted', this.redirect.bind(this)) // NEED
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
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );

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
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

            <h4>Popover in a modal</h4>
            <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>

            <h4>Tooltips in a modal</h4>
            <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>

            <hr />

            <h4>Overflowing text to show scroll behavior</h4>

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

              </div>



          </Modal.Body>
          <Modal.Footer>
            <div>
              <input type='submit' value='Update Job' className="btn-primary" />
              <Button bsStyle='danger' className="glyphicon glyphicon-trash" onClick={this.handleDelete.bind(this)}></Button>
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
