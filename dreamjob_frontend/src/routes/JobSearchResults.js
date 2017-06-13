import React, { Component } from 'react';
import {researchJob} from '../actions/actions';
import jobResearchStore from '../stores/JobResearchStore';
import {BrowserRouter as Link} from 'react-router-dom';
import {Col, Grid, Row} from 'react-bootstrap';
import userStore from '../stores/UserStore'

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
    userStore.on('logout', this.logout.bind(this))
  }

  logout(){
    this.props.history.push('/login')
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
    if(jobListings.length !== 0){
      jobListings.map(function(job) {
        return jobList.push(<p key={job.id}> {job.id}, {job.jobTitle}, {job.numJobs} </p>)
        })
    }

    var companyListings = this.state.companies;
    let companyList = []
    if(companyListings.length !== 0){
      companyListings.map(function(company) {
        return companyList.push(
          <div>
            <Col md={8} mdOffset={2}>
              <div className ='jobList' key={'key' + company.id}>
                <img src={company.squareLogo} alt={company.name} />
                <p key={company.id}> {company.id}, {company.name}, {company.numJobs} </p>
                <p key={'sec' + company.id}> {company.rating} out of 5 stars, <a href={company.reviewsUrl}>{`${company.name} Reviews`}</a></p>
              </div>
            </Col>
          </div>
        )
      })
    }

    return (
      <div>
        <h2>Results for search "{jobSearch}" in "{locationSearch}":</h2>
        <a href="/search_results">Back to Job Research</a>
        {/* <Link to="/search_results">Back to Job Research</Link> */}
        <Grid>
          <Row>
            {companyList}
            <br />
          </Row>
        </Grid>
        <br />
        <p style={{fontWeight:"bold"}}>Job ID, Job Title, Number of jobs in the Area</p>
        {jobList}

      </div>
    )
  }
}

export default JobSearchResults;
