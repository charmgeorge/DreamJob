import React, { Component } from 'react';
import jobStore from '../stores/jobStore';
import {Link} from 'react-router-dom';

class glassdoor extends Component {
  constructor(props){
    super(props)
    this.state={
      data: jobStore.getDetails(),
      error:""
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
        <div className='container'>
          <div className='row'>
            <div className='col-xs-6 col-xs-offset-3'>
              <div className="pull-left">
                <Link to="/job_index"><button className='btn-primary glyphicon glyphicon-list'>Index</button></Link>
              </div>
              <div className='panel panel-default'>
                <div className='panel-body'>
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
                        <div>
                          <br />
                          <label>CEO Approval Rating (out of 100)</label>
                          <br />
                          {this.state.data.ceo.pctApprove}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default glassdoor;
