import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

class addJob extends Component {
  render() {
    return (
      <div className="App">
        <h3>Add A Job</h3>
        <form className="form">
          <div className="form-group">
            <label>Company</label>
            <input />
            <br />
          </div>
          <div className="form-group">
            <label>Job Title</label>
            <input />
            <br />
          </div>
          <div className="form-group">
            <label>City</label>
            <input />
            <br />
          </div>
          <div className="form-group">
            <label>Status</label>
            <input />
            <br />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input />
            <br />
          </div>
          <div className="form-group">
            <label>Job Posting URL</label>
            <input />
            <br />
          </div>
          <div className="form-group">
            <label>Notes</label>
            <input />
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
