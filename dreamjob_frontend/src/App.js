import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import addJob from './routes/addJob';
import jobStore from './stores/jobStore';
import jobIndex from './routes/jobIndex';
import RegisterUser from './routes/RegisterUser';
import Home from './routes/Home';
import jobDetails from './routes/jobDetails';
import {updateJobs} from './actions/actions';

class App extends Component {
  constructor(props){
    super(props)
    updateJobs()
    this.state = {
      message:jobStore.getMessage()
    }
  }

  updateMessage(){
    this.setState({
      message:jobStore.getMessage()
    })
  }

  componentWillMount(){
    jobStore.on('message', this.updateMessage.bind(this))
  }

  render() {
    return (
      <div>
        <div className="message">{this.state.message}</div>
        <div className="App">
          <div className="App-header">
            <h2>Dream Job</h2>
          </div>
          <Router>
            <div>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/register" component={RegisterUser}></Route>
              <Route exact path = '/add_job' component={addJob}></Route>
              <Route exact path = '/job_index' component={jobIndex}></Route>
              <Route exact path = '/job_details' component={jobDetails}></Route>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
