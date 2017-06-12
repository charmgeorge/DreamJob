import React, { Component } from 'react';
import {researchJob} from '../actions/actions';
import jobResearchStore from '../stores/JobResearchStore';

//glassdoor must persist, so we call the glassdoor ACTION in the constructor
class JobSearchResults extends Component {
  constructor(props){
    super(props)
    console.log(this.props.match.params);
    researchJob(this.props.match.params)
    this.state={
      jobs: jobResearchStore.getJobs(),
      companies: jobResearchStore.getCompanies(),
      error:""
    }
  }

  render(){

    return (
      <div>
        <h1>hello, nick</h1>

        <p>hola</p>



      </div>
    )
  }
}

export default JobSearchResults;
