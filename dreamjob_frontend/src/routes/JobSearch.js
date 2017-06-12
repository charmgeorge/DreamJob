import React, { Component } from 'react';
import {researchJob} from '../actions/actions';

class JobSearch extends Component {
  constructor(props){
    super(props)
    this.state={
      search: {
        job: "",
        location: ""
      }
    }
  }
  handleChange(e){
    let target = e.target;
    let search = this.state.search;
    search[target.name] = target.value
    this.setState({
      search:search
    })
    console.log(this.state);
  }

  handleSubmit(e){
    e.preventDefault()
    // console.log(e.target);
    researchJob(this.state)
  }

  render(){
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-xs-6 col-xs-offset-3'>
            <div className='panel panel-default'>
              <div className='panel-body'>
                <h3>Research a job!</h3>
                <form className="form" onSubmit={this.handleSubmit.bind(this)}>
                  <div className='row'>
                    <div className='col-xs-12'>
                      <div>
                        <label>Job Title</label>
                        <br />
                        <input
                          type='text'
                          name='job'
                          value={this.state.search.job}
                          onChange={this.handleChange.bind(this)}
                        />
                          <br />
                      </div>
                      <div>
                        <label>Location</label>
                        <br />
                        <input
                          type='text'
                          name='location'
                          value={this.state.search.location}
                          onChange={this.handleChange.bind(this)}
                        />
                        <br />
                      </div>
                    </div>
                  </div>
                  <br />
                  <input type='submit' value='Submit' className="btn btn-primary" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default JobSearch;
