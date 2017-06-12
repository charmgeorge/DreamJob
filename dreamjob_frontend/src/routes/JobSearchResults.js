import React, { Component } from 'react';
import {researchJob} from '../actions/actions';
import jobResearchStore from '../stores/JobResearchStore';
import {BrowserRouter as Link} from 'react-router-dom';

//glassdoor must persist, so we call the glassdoor ACTION in the constructor
class JobSearchResults extends Component {
  constructor(props){
    super(props)
    // console.log(this.props.match.params);
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

    var jobSearch = this.props.match.params.job;
    var locationSearch = this.props.match.params.location;

    var jobListings = this.state.jobs;
    let jobList = []
    console.log('jobs,' ,jobList);
    if(jobListings.length !== 0){
      jobListings.map((job) => {
         jobList.push(<p key={job.id}> {job.id}, {job.jobTitle}, {job.numJobs} </p>)
      })
    }

    var companyListings = this.state.companies;
    let companyList = []
    console.log('companies list, ', companyList);
    if(companyListings.length !== 0){
      companyListings.map((company) => {
        companyList.push(
          <div key={'key' + company.id}>
            <img src={company.squareLogo} alt={company.name} />
            <p key={company.id}> {company.id}, {company.name}, {company.numJobs} </p>
            <p key={'sec' + company.id}> {company.rating} out of 5 stars, <a href={company.reviewsUrl}>{`${company.name} Reviews`}</a></p>
          </div>
        )
      })
    }

    return (
      <div>
        <h2>Results for search "{jobSearch}" in "{locationSearch}":</h2>
        {/* <Link to="/job_research">Back to Job Research</Link> */}
        <p style={{fontWeight:"bold"}}>Job ID, Job Title, Number of jobs in the Area</p>

        {companyList}
        {jobList}

      </div>
    )
  }
}

export default JobSearchResults;
