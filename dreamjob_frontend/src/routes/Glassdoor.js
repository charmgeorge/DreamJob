import React, { Component } from 'react';
import jobStore from '../stores/JobStore';
import {glassdoorDetails} from '../actions/actions'
import { Link } from 'react-router-dom';

class Glassdoor extends Component {
  constructor(props){
    super(props)
    glassdoorDetails(this.props.match.params.company)
    this.state={
      data: jobStore.getDetails(),
      error:"",
      err: ""
    }
  }

  componentWillMount(){
    jobStore.on('glassdoor', this.updateDetails.bind(this)) //need to listen to this emission
    jobStore.on('glassdoor_404', this.updateGlassdoor404.bind(this));
  }

  updateDetails(){
    this.setState({
      data:jobStore.getDetails()
    })
  }
  updateGlassdoor404(){
    this.setState({
      err: jobStore.get404Details()
    })
    console.log('logging', this.state.err);
  }

  renderCompany(){
    let ceoData;
    if(this.state.data.ceo){
      ceoData = this.state.data.ceo.pctApprove
    } else {
      ceoData = "no data"
    }

    let reviewData;
    if(this.state.data.featuredReview){
      reviewData = (
        <div>
          <div>
            <br />
            <label>An Insider's Pros</label>
            <br />
            {this.state.data.featuredReview.pros}
          </div>
          <div>
            <br />
            <label>An Insider's Cons</label>
            <br />
            {this.state.data.featuredReview.cons}
          </div>
        </div>
        )
    } else {
      reviewData = "no data"
    }

    return(
      <div>
        <h3>{this.state.data.name}</h3>
        <div className='row'>
          <div className='col-xs-12'>
            <div>
              <img src={this.state.data.squareLogo} alt={this.state.data.name} />
              <br />
            </div>
            <div>
              <br />
              <label>Overall Rating (out of 5): </label>
              <br />
              {this.state.data.overallRating}
            </div>
            <div>
              <label>Culture and Values Rating (out of 5)</label>
              <br />
              {this.state.data.cultureAndValuesRating}
            </div>
            <div>
              <label>Senior Leadership Rating (out of 5)</label>
              <br />
              {this.state.data.seniorLeadershipRating}
            </div>
            <div>
              <label>Compensation and Benefits Rating (out of 5)</label>
              <br />
              {this.state.data.compensationAndBenefitsRating}
            </div>
            <div>
              <label>Career Opportunities Rating (out of 5)</label>
              <br />
              {this.state.data.careerOpportunitiesRating}
            </div>
            <div>
              <label>Work/Life Balance Rating (out of 5)</label>
              <br />
              {this.state.data.workLifeBalanceRating}
            </div>
            <div>
              <label>Recommend To Friend Rating (out of 100)</label>
              <br />
              {this.state.data.recommendToFriendRating}
            </div>
            <div>
              {reviewData}
            </div>
            <div>
              <br />
              <label>CEO Approval Rating (out of 100)</label>
              <br />
              {ceoData}
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    let companyView
    if(Object.keys(this.state.data).length > 0  && !this.state.err){
      companyView = this.renderCompany()
    } else {
      companyView = (
        <div>
          <h3>Company not found on Glassdoor</h3>
          <br />
          <Link to={`/job_index`}>Back</Link>
        </div>
      )
    }

    return(
      <div>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-6 col-xs-offset-3'>
              <div className='panel panel-default'>
                <div className='panel-body'>
                  {companyView}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Glassdoor;
