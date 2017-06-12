import React, { Component } from 'react';

class JobSearch extends Component {
  constructor(props){
    super(props)
    this.state={
      search: {
        job: "",
        location: "",
        // radius:null,

      }
    }
  }

  // add the glassdoor attribution by the search https://www.glassdoor.com/developer/jobsApiActions.htm
  // add more options to search and use conditionals to see if user searched for a given field (don't make the fields required to submit the field)
  // radius, jobType, 

  // - nick

  handleChange(e){
    let target = e.target;
    let search = this.state.search;
    search[target.name] = target.value
    this.setState({
      search:search
    })
  }

  handleSubmit(e){
    // console.log(this.state.search);
    let job = this.state.search.job;
    let location = this.state.search.location;
    e.preventDefault()
    this.props.history.push(`/job_research/${job}/${location}`)
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
