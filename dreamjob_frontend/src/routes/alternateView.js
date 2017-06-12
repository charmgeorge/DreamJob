import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import {updateJobs, checkLoginRedir, sort} from '../actions/actions';
import jobStore from '../stores/jobStore';
import Alternate from '../components/Alternate';
import {Button} from 'react-bootstrap';

class alternateView extends Component {
  constructor(props){
  super(props)
  updateJobs()
  this.state = {
    jobs: jobStore.getJobs()
    }
  }

  componentWillMount(){
    jobStore.on('jobsLoaded',this.updateJobs.bind(this)) // NEED
    jobStore.on('jobDeleted',this.updateJobs.bind(this)) // NEED
    jobStore.on('sorted',this.updateJobs.bind(this)) // NEED
    checkLoginRedir(this.props)
  }

  componentWillUnmount(){
    jobStore.removeListener('jobsLoaded',this.updateJobs.bind(this))
  }

  updateJobs(){
    this.setState({
      jobs:jobStore.getJobs()
    })
  }

  renderJobs(){
    let jobRender = []
    for(var i=0; i<this.state.jobs.length; i++){
      let jobId = "job-" + i
      jobRender.push(
        <Alternate history={this.props.history} key={jobId} job={this.state.jobs[i]} />
      )
    }
    return jobRender
  }

  handleClick(e){
    let column = e.target.name
    console.log(column)
    sort(column)
  }

  render() {
    return (
      <div className='container'>
        <h3>Current Dream Jobs</h3>

          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th></th>
                <th><Button block name='company' onClick={this.handleClick.bind(this)}>Company</Button></th>
                <th><Button block name='jobTitle' onClick={this.handleClick.bind(this)}>Job Title</Button></th>
                <th><Button block name='status' onClick={this.handleClick.bind(this)}>Status</Button></th>
                <th><Button block>Job Details</Button></th>
              </tr>
            </thead>
            <tbody>
              {this.renderJobs()}
            </tbody>
          </Table>
      </div>
    );
  }
}

export default alternateView

//FAILED ATTEMPT AT REACT-BOOTSTRAP-TABLE
// import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
// import Pop from '../components/Pop';
// let order = 'desc';

//   handleBtnClick = () => {
//   if (order === 'desc') {
//     this.refs.table.handleSort('asc', 'name');
//     order = 'asc';
//   } else {
//     this.refs.table.handleSort('desc', 'name');
//     order = 'desc';
//   }
// }

// renderModal(){
//   return <Pop history={this.props.history} job={this.props.job} />
// }

// <BootstrapTable ref='table' data={ this.state.jobs }>
//     <TableHeaderColumn dataField='updatedAt' isKey={ true } dataSort={ true }>Last Update</TableHeaderColumn>
//     <TableHeaderColumn dataField='company' dataSort={ true }>Company</TableHeaderColumn>
//     <TableHeaderColumn dataField='jobTitle'>Job Title</TableHeaderColumn>
//     <TableHeaderColumn dataField='status'>Status</TableHeaderColumn>
//     <TableHeaderColumn dataField={this.renderModal.bind(this)}>Job Details</TableHeaderColumn>
// </BootstrapTable>
