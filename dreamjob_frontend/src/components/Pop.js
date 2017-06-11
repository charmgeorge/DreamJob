import React, { Component } from 'react';
import {Button, Modal, OverlayTrigger,Popover} from 'react-bootstrap';
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
    this.close()
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
    const popoverCompany = (
      <Popover id="modal-popover" title="Company">
        List the company for which you are interested or are seeking employ.
      </Popover>
    )

    const popoverUrl = (
      <Popover id="modal-popover" title="URL To Job Posting">
        Did you find the job posting online? At Indeed? Dice? Save it here!
      </Popover>
    )

    const popoverJobTitle = (
      <Popover id="modal-popover" title="URL To Job Posting">
        For what position are you interested or applying?
      </Popover>
    )

    const popoverCity = (
      <Popover id="modal-popover" title="URL To Job Posting">
        Will you have to relocate? Where's the job?
      </Popover>
    )

    const popoverStatus = (
      <Popover id="modal-popover" title="URL To Job Posting">
        At what stage are you in the hiring process?
      </Popover>
    )

    const popoverDate = (
      <Popover id="modal-popover" title="URL To Job Posting">
        When did you last take action on this job (i.e. apply, thank your interviewer)? Or, do you have anything lined up (i.e. phone or in-person interview)?
      </Popover>
    )

    const popoverNotes = (
      <Popover id="modal-popover" title="URL To Job Posting">
        Who did you meet? Which cover letter did you send? Add any relevant notes here.
      </Popover>
    )

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
                  <br />
                  <label><OverlayTrigger overlay={popoverCompany}><a href="#">Company</a></OverlayTrigger></label>
                  <br />
                  <input type='text' name='company' value={this.state.job.company} onChange={this.handleChange.bind(this)}/>
                  <br />
                </div>
                <div>
                  <br />
                    <label><OverlayTrigger overlay={popoverUrl}><a href="#">URL To Job Posting</a></OverlayTrigger></label>
                  <br />
                  <input type='text' name='url' value={this.state.job.url} onChange={this.handleChange.bind(this)}/>
                  <br />
                </div>
                <div>
                  <br />
                    <label><OverlayTrigger overlay={popoverJobTitle}><a href="#">Job Title</a></OverlayTrigger></label>
                  <br />
                  <input type='text' name='jobTitle' value={this.state.job.jobTitle} onChange={this.handleChange.bind(this)} />
                  <br />
                </div>
                <div>
                  <br />
                    <label><OverlayTrigger overlay={popoverCity}><a href="#">City</a></OverlayTrigger></label>
                  <br />
                  <input type='text' name='city' value={this.state.job.city} onChange={this.handleChange.bind(this)} />
                  <br />
                </div>
                <div>
                  <br />
                    <label><OverlayTrigger overlay={popoverStatus}><a href="#">Status</a></OverlayTrigger></label>
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
                  <br />
                    <label><OverlayTrigger overlay={popoverDate}><a href="#">Date</a></OverlayTrigger></label>
                  <br />
                  <input type='date' name='date' value={this.state.job.date} onChange={this.handleChange.bind(this)} />
                  <br />
                </div>
                <div>
                  <br />
                    <label><OverlayTrigger overlay={popoverNotes}><a href="#">Notes</a></OverlayTrigger></label>
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
              <Button bsStyle='primary' onClick={this.handleSubmit.bind(this)} type='submit'>Update Job</Button>
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
