import React, { Component } from 'react';
import jobStore from '../stores/jobStore'

class glassdoor extends Component {
  constructor(props){
    super(props)
    this.state={
      data: jobStore.getDetails(),
      error:""
        // name:"",
        // overallRating:"",
        // recommendToFriendRating:""
    }
  }

  updateDetails(){
    this.setState({
      data:jobStore.getDetails()
    })
  }

  componentWillMount(){
    jobStore.on('glassdoor', this.updateDetails.bind(this))
  }

  render() {
    return (
      <div>
        <ul>
          <li><img src={this.state.data.squareLogo} alt={this.state.data.name} /></li>
          <li>Company: {this.state.data.name}</li>
          <li>Overall Rating: {this.state.data.overallRating} out of 5</li>
          <li>Culture and Values Rating: {this.state.data.cultureAndValuesRating} out of 5</li>
          <li>Senior Leadership Rating: {this.state.data.seniorLeadershipRating} out of 5</li>
          <li>Compensation and Benefits Rating: {this.state.data.compensationAndBenefitsRating} out of 5</li>
          <li>Career Opportunities Rating: {this.state.data.careerOpportunitiesRating} out of 5</li>
          <li>Work/Life Balance Rating: {this.state.data.workLifeBalanceRating} out of 5</li>
          <li>Recommend To Friend Rating: {this.state.data.recommendToFriendRating} out of 100</li>
          <li>An Insider's Pros: {this.state.data.featuredReview.pros}</li>
          <li>An Insider's Cons: {this.state.data.featuredReview.cons}</li>
          <li>CEO Approval Rating: {this.state.data.ceo.pctApprove} out of 100</li>
        </ul>
      </div>
    );
  }
}

export default glassdoor;
