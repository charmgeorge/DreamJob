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
    let job = this.state.search.job;
    let location = this.state.search.location;
    e.preventDefault()
    this.props.history.push(`/search_results/${job}/${location}`)
  }

  render(){
    return (
      <div className='formContainer'>
        <div className='container' >
          <div className='row'>
            <div className='col-xs-6 col-xs-offset-3'>
              <div className='panel panel-default'>
                <div className='panel-body'>
                  <h3 >Find New Jobs</h3>
                  <hr className='hrstyle' />
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
                    <p className='powered' >powered by
                      <a href='https://www.glassdoor.com/index.htm'><img className='glassImg' src='https://www.glassdoor.com/static/img/api/glassdoor_logo_80.png' title='Job Search'  /></a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default JobSearch;
