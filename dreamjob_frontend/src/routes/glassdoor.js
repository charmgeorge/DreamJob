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
      <div className='container'>
        <ul>
          <li><img src={this.state.data.squareLogo} alt={this.state.data.name} /></li>
          <li>
            <label>Company</label>
            <br />
            {this.state.data.name}
          </li>
          <li>
            <label>Overall Rating (out of 5)</label>
            <br />
            {this.state.data.overallRating}
          </li>
          <li>
            <label>Culture and Values Rating (out of 5)</label>
            <br />
            {this.state.data.cultureAndValuesRating}
          </li>
          <li>
            <label>Senior Leadership Rating (out of 5)</label>
            <br />
            {this.state.data.seniorLeadershipRating}
          </li>
          <li>
            <label>Compensation and Benefits Rating (out of 5)</label>
            <br />
            {this.state.data.compensationAndBenefitsRating}
          </li>
          <li>
            <label>Career Opportunities Rating (out of 5)</label>
            <br />
            {this.state.data.careerOpportunitiesRating}
          </li>
          <li>
            <label>Work/Life Balance Rating (out of 5)</label>
            <br />
            {this.state.data.workLifeBalanceRating}
          </li>
          <li>
            <label>Recommend To Friend Rating (out of 100)</label>
            <br />
            {this.state.data.recommendToFriendRating}
          </li>
          <li>
            <label>An Insider's Pros</label>
            <br />
            {this.state.data.featuredReview.pros}
          </li>
          <li>
            <label>An Insider's Cons</label>
            <br />
            {this.state.data.featuredReview.cons}
          </li>
          <li>
            <label>CEO Approval Rating (out of 100)</label>
            <br />
            {this.state.data.ceo.pctApprove}
          </li>
        </ul>
      </div>
    );
  }
}

export default glassdoor;
