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
      jobs: [],
      companies: [],
      error:""
    }
  }

  componentWillMount(){
    jobResearchStore.on('jobResearchStoreUpdated', this.updateDetails.bind(this))
  }

  updateDetails(){
    this.setState({
      jobs: jobResearchStore.getJobs(),
      companies: jobResearchStore.getCompanies()
    })
  }

  render(){

    var jobListings = this.state.jobs;
    console.log('listings', jobListings);

    let list = []

    if(jobListings.length !== 0){
      jobListings.map((job) => {
         list.push(<p>{job.id}, {job.jobTitle}, {job.numJobs} </p>)
      })
    }


    return (
      <div>
        <h1>hola, nick</h1>

        {list}


      </div>
    )
  }
}

export default JobSearchResults;
