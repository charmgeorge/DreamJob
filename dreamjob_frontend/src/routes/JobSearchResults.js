import React, { Component } from 'react';
import {researchJob} from '../actions/actions';
import jobResearchStore from '../stores/JobResearchStore';
import {BrowserRouter as Link} from 'react-router-dom';
import {Col, Grid, Row, Image} from 'react-bootstrap';

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
            <Col sm={6} md={3}>
              <img src={company.squareLogo} alt={company.name} />
              <p key={company.id}> {company.id}, {company.name}, {company.numJobs} </p>
              <p key={'sec' + company.id}> {company.rating} out of 5 stars, <a href={company.reviewsUrl}>{`${company.name} Reviews`}</a></p>
            </Col>
          )
      })
    }

    return (
      <div>

        {/* <Link to="/search_results">Back to Job Research</Link> */}
          <Grid>
            <h2>Results for search "{jobSearch}" in "{locationSearch}":</h2>
            <Row>
              <Col sm={8} md={8} smOffset={2} mdOffset={2}>
                <Image src={`https://maps.googleapis.com/maps/api/staticmap?center=${locationSearch}&zoom=13&size=600x350&key=AIzaSyCgbhKeMQhm9PH7fT5rKbcBdHhhDoOQ8pU`} alt={`${locationSearch}`} responsive />
              </Col>
            </Row>
            <a href="/job_research">Back to Job Research</a>
            <br />
            <Row>
              {companyList}
            </Row>
          </Grid>
{/*
        <br />
        <br />
        <p style={{fontWeight:"bold"}}>Job ID, Job Title, Number of jobs in the Area</p>
        {jobList}

*/}

      </div>
    )
  }
}

export default JobSearchResults;
